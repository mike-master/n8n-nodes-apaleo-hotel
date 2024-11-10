import {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
  INodeExecutionData,
  IHttpRequestMethods,
} from 'n8n-workflow';

export class ApaleoApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Apaleo',
    name: 'apaleoApi',
    subtitle: '={{$parameter["operation"]}}',
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
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Booking', value: 'booking' },
          { name: 'Reservation', value: 'reservation' },
        ],
        default: 'booking',
        description: 'Select the resource to interact with',
      },
      // Booking operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'CREATE Booking',
            value: 'create_booking',
            description: 'Endpoint: /booking/v1/bookings Creates a booking for one or more reservations',
            action: 'Create a booking',
          },
          {
            name: 'GET Booking by ID',
            value: 'get_booking_by_id',
            description: 'Endpoint: /booking/v1/bookings/{id} Return a specific booking',
            action: 'Get a booking by ID',
          },
          {
            name: 'PATCH Booking by ID',
            value: 'patch_booking_by_id',
            description: 'Endpoint: /booking/v1/booking/{id} Allow to modify certain booking properties',
            action: 'Update a booking by ID',
          },
        ],
        default: 'get_booking_by_id',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['booking'],
          },
        },
      },
      // Reservation operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'GET Reservation by ID',
            value: 'get_reservation_by_id',
            description: 'Endpoint: /booking/v1/reservations/{id} Return a specific reservation',
            action: 'Get a reservation by ID',
          },
          {
            name: 'PATCH Reservation by ID',
            value: 'patch_reservation_by_id',
            description: 'Endpoint: /booking/v1/reservation/{id} Allow to modify certain reservation properties',
            action: 'Update a reservation by ID',
          },
        ],
        default: 'get_reservation_by_id',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['reservation'],
          },
        },
      },
      {
        displayName: 'Booking ID',
        name: 'bookingId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the booking to retrieve or modify.',
        displayOptions: {
          show: {
            resource: ['booking'],
            operation: ['get_booking_by_id', 'patch_booking_by_id'],
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
        displayName: 'Reservation ID',
        name: 'reservationId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the reservation to retrieve or modify.',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservation_by_id', 'patch_reservation_by_id'],
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
      {
        displayName: 'Reservations Data',
        name: 'reservationsData',
        type: 'json',
        required: true,
        default: `[
          {
            "paymentAccount": {
              "accountNumber": "1111",
              "accountHolder": "John Doe",
              "expiryMonth": "8",
              "expiryYear": "2018",
              "paymentMethod": "visa",
              "payerEmail": "s.hopper@test.com",
              "payerReference": "4ea6462b-cca3-4c17-a035-c7b5132db83c",
              "isVirtual": false
            },
            "booker": {
              "title": "Mr",
              "gender": "Male",
              "firstName": "Jon",
              "middleInitial": "D",
              "lastName": "Doe",
              "email": "john.d@doe.com",
              "phone": "+4989123343",
              "address": {
                "addressLine1": "My Street 1",
                "postalCode": "12453",
                "city": "MyCity",
                "countryCode": "GB"
              }
            },
            "reservations": [
              {
                "arrival": "2024-11-10",
                "departure": "2024-11-12",
                "adults": 1,
                "childrenAges": [
                  6
                ],
                "guestComment": "I need a wake up service",
                "channelCode": "Direct",
                "primaryGuest": {
                  "title": "Mr",
                  "gender": "Male",
                  "firstName": "Jon",
                  "middleInitial": "D",
                  "lastName": "Doe",
                  "email": "john.d@doe.com",
                  "phone": "+4989123343",
                  "address": {
                    "addressLine1": "My Street 1",
                    "postalCode": "12453",
                    "city": "MyCity",
                    "countryCode": "GB"
                  }
                },
                "guaranteeType": "Prepayment",
                "travelPurpose": "Business",
                "timeSlices": [
                  {
                    "ratePlanId": "MUC-NONREF-FAMILY"
                  },
                  {
                    "ratePlanId": "MUC-NONREF-FAMILY"
                  }
                ],
                "services": [
                  {
                    "serviceId": "MUC-BRKF"
                  },
                  {
                    "serviceId": "MUC-YOGA",
                    "dates": [
                      {
                        "serviceDate": "2024-11-11",
                        "amount": {
                          "amount": 35,
                          "currency": "EUR"
                        }
                      }
                    ]
                  }
                ],
                "prePaymentAmount": {
                  "amount": 50,
                  "currency": "EUR"
                }
              }
            ],
            "transactionReference": "564578124534890J"
          }
        ]`,
        description: 'JSON array of reservation objects to create the booking.',
        displayOptions: {
          show: {
            resource: ['booking'],
            operation: ['create_booking'],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    if (items.length === 0) {
      throw new Error('No input data received');
    }

    const credentials = await this.getCredentials('apaleoApi');
    const clientId = credentials.clientId as string;
    const clientSecret = credentials.clientSecret as string;

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
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;

      // Handle Booking operations
      if (resource === 'booking') {
        if (operation === 'get_booking_by_id') {
          const bookingId = this.getNodeParameter('bookingId', i) as string;
          if (!bookingId) throw new Error('Booking ID is required for get_booking_by_id');

          const expandBooking = Array.isArray(this.getNodeParameter('expandBooking', i))
            ? this.getNodeParameter('expandBooking', i) as string[]
            : [];
          const queryBooking: Record<string, string> = {};
          if (expandBooking.length) {
            queryBooking.expand = expandBooking.join(',');
          }

          const options = {
            method: 'GET' as IHttpRequestMethods,
            url: `https://api.apaleo.com/booking/v1/bookings/${bookingId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: queryBooking,
            json: true,
          };

          try {
            const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
            returnData.push({ json: response });
          } catch (error) {
            throw new Error(`Apaleo GET booking failed: ${error.message}`);
          }
        } else if (operation === 'create_booking') {
					const reservationsData = this.getNodeParameter('reservationsData', i) as string;

					let parsedReservationsData;

					try {
							parsedReservationsData = JSON.parse(reservationsData);
					} catch (error) {
							throw new Error(`Invalid JSON in reservations data: ${error.message}`);
					}

					const options = {
						method: 'POST' as IHttpRequestMethods,
						url: `https://api.apaleo.com/booking/v1/bookings`,
						headers: {
								Authorization: `Bearer ${accessToken}`,
								'Content-Type': 'application/json',
						},
						body: parsedReservationsData, // Direkter Zugriff statt verschachtelt unter `reservations`
						json: true,
				};
					try {
							const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
							returnData.push({ json: response });
					} catch (error) {
							throw new Error(`Apaleo POST booking failed: ${error.message}`);
					}
				} else if (operation === 'patch_booking_by_id') {
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
            returnData.push({ json: response || { message: 'Booking patched successfully' } });
          } catch (error) {
            throw new Error(`Apaleo PATCH booking failed: ${error.message}`);
          }
        }
      }

      // Handle Reservation operations
      if (resource === 'reservation') {
        if (operation === 'get_reservation_by_id') {
          const reservationId = this.getNodeParameter('reservationId', i) as string;
          if (!reservationId) throw new Error('Reservation ID is required for get_reservation_by_id');

          const expandReservation = Array.isArray(this.getNodeParameter('expandReservation', i))
            ? this.getNodeParameter('expandReservation', i) as string[]
            : [];
          const queryReservation: Record<string, string> = {};
          if (expandReservation.length) {
            queryReservation.expand = expandReservation.join(',');
          }

          const options = {
            method: 'GET' as IHttpRequestMethods,
            url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            qs: queryReservation,
            json: true,
          };

          try {
            const response = await this.helpers.requestWithAuthentication.call(this, 'apaleoApi', options);
            returnData.push({ json: response });
          } catch (error) {
            throw new Error(`Apaleo GET reservation failed: ${error.message}`);
          }
        } else if (operation === 'patch_reservation_by_id') {
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
            returnData.push({ json: response || { message: 'Reservation patched successfully' } });
          } catch (error) {
            throw new Error(`Apaleo PATCH reservation failed: ${error.message}`);
          }
        }
      }
    }

    return this.prepareOutputData(returnData);
  }
}
