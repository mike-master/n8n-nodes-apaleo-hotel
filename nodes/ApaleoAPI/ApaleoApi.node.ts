import {
  IExecuteFunctions,
  INodeExecutionData,
  IDataObject,
  INodeType,
  INodeTypeDescription,
  IHttpRequestMethods,
} from 'n8n-workflow';

export class ApaleoApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Apaleo',
    name: 'apaleoApi',
    icon: 'file:apaleo.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with Apaleo API',
    defaults: {
      name: 'Apaleo API',
      color: '#1A82e2',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'apaleoApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          { name: 'Get Booking by ID', value: 'get_booking_by_id' },
          { name: 'Patch Booking by ID', value: 'patch_booking_by_id' },
          { name: 'Get Reservation by ID', value: 'get_reservation_by_id' },
          { name: 'Patch Reservation by ID', value: 'patch_reservation_by_id' },
        ],
        default: '',
        description: 'Select the operation to perform',
      },
      {
        displayName: 'Booking ID',
        name: 'bookingId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the booking to retrieve or modify',
        displayOptions: {
          show: {
            operation: ['get_booking_by_id', 'patch_booking_by_id'],
          },
        },
      },
      {
        displayName: 'Reservation ID',
        name: 'reservationId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the reservation to retrieve or modify',
        displayOptions: {
          show: {
            operation: ['get_reservation_by_id', 'patch_reservation_by_id'],
          },
        },
      },
      {
        displayName: 'Expand (Booking)',
        name: 'expandBooking',
        type: 'multiOptions',
        options: [
          { name: 'property', value: 'property' },
          { name: 'unitGroup', value: 'unitGroup' },
          { name: 'ratePlan', value: 'ratePlan' },
          { name: 'services', value: 'services' },
          { name: 'reservations', value: 'reservations' },
          { name: 'propertyValues', value: 'propertyValues' },
        ],
        default: [],
        description: 'List of all embedded resources to expand in the booking response',
        displayOptions: {
          show: {
            operation: ['get_booking_by_id'],
          },
        },
      },
      {
        displayName: 'Expand (Reservation)',
        name: 'expandReservation',
        type: 'multiOptions',
        options: [
          { name: 'timeSlices', value: 'timeSlices' },
          { name: 'services', value: 'services' },
          { name: 'booker', value: 'booker' },
          { name: 'actions', value: 'actions' },
          { name: 'company', value: 'company' },
          { name: 'assignedUnits', value: 'assignedUnits' },
        ],
        default: [],
        description: 'List of all embedded resources to expand in the reservation response',
        displayOptions: {
          show: {
            operation: ['get_reservation_by_id'],
          },
        },
      },
      {
        displayName: 'Patch Operations (Booking)',
        name: 'patchOperationsBooking',
        type: 'json',
        required: true,
        default: `[
          {
            "op": "string",
            "path": "string",
            "value": "string",
            "from": "string"
          }
        ]`,
        description: 'JSON patch operations for booking modifications.',
        displayOptions: {
          show: {
            operation: ['patch_booking_by_id'],
          },
        },
      },
      {
        displayName: 'Patch Operations (Reservation)',
        name: 'patchOperationsReservation',
        type: 'json',
        required: true,
        default: `[
          {
            "op": "string",
            "path": "string",
            "value": "string",
            "from": "string"
          }
        ]`,
        description: 'JSON patch operations for reservation modifications.',
        displayOptions: {
          show: {
            operation: ['patch_reservation_by_id'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    // Get credentials for Apaleo API
    const credentials = await this.getCredentials('apaleoApi');
    const clientId = credentials.clientId as string;
    const clientSecret = credentials.clientSecret as string;

    // Helper function to get the access token
    const getAccessToken = async (): Promise<string> => {
      const tokenOptions = {
        method: 'POST' as IHttpRequestMethods,
        url: 'https://identity.apaleo.com/connect/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        json: true,
      };

      try {
        const response = await this.helpers.request(tokenOptions);
        return response.access_token;
      } catch (error) {
        throw new Error(`Failed to obtain access token: ${error.message}`);
      }
    };

    const accessToken = await getAccessToken();

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;

      if (operation === 'get_booking_by_id') {
        const bookingId = this.getNodeParameter('bookingId', i) as string;
        const expand = this.getNodeParameter('expandBooking', i) as string[];
        const query = expand.length ? { expand: expand.join(',') } : {};

        const options = {
          method: 'GET' as IHttpRequestMethods,
          url: `https://api.apaleo.com/booking/v1/bookings/${bookingId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          qs: query,
          json: true,
        };

        try {
          const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
          returnData.push(response);
        } catch (error) {
          throw new Error(`Apaleo GET booking failed: ${error.message}`);
        }
      }

      if (operation === 'patch_booking_by_id') {
        const bookingId = this.getNodeParameter('bookingId', i) as string;
        const patchOperations = this.getNodeParameter('patchOperationsBooking', i) as string;
        let parsedPatchOperations;

        try {
          parsedPatchOperations = JSON.parse(patchOperations);
        } catch (error) {
          throw new Error(`Invalid JSON in patch operations: ${error.message}`);
        }

        const options = {
          method: 'PATCH' as IHttpRequestMethods,
          url: `https://api.apaleo.com/booking/v1/bookings/${bookingId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: parsedPatchOperations,
          json: true,
        };

        try {
          const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
          returnData.push(response || { message: 'Booking patched successfully' });
        } catch (error) {
          throw new Error(`Apaleo PATCH booking failed: ${error.message}`);
        }
      }

      if (operation === 'get_reservation_by_id') {
        const reservationId = this.getNodeParameter('reservationId', i) as string;
        const expand = this.getNodeParameter('expandReservation', i) as string[];
        const query = expand.length ? { expand: expand.join(',') } : {};

        const options = {
          method: 'GET' as IHttpRequestMethods,
          url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          qs: query,
          json: true,
        };

        try {
          const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
          returnData.push(response);
        } catch (error) {
          throw new Error(`Apaleo GET reservation failed: ${error.message}`);
        }
      }

      if (operation === 'patch_reservation_by_id') {
        const reservationId = this.getNodeParameter('reservationId', i) as string;
        const patchOperations = this.getNodeParameter('patchOperationsReservation', i) as string;
        let parsedPatchOperations;

        try {
          parsedPatchOperations = JSON.parse(patchOperations);
        } catch (error) {
          throw new Error(`Invalid JSON in patch operations: ${error.message}`);
        }

        const options = {
          method: 'PATCH' as IHttpRequestMethods,
          url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: parsedPatchOperations,
          json: true,
        };

        try {
          const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
          returnData.push(response || { message: 'Reservation patched successfully' });
        } catch (error) {
          throw new Error(`Apaleo PATCH reservation failed: ${error.message}`);
        }
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
