import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { bookingOperations } from './operations/bookingOperations';
import { reservationActionsOperations } from './operations/reservationActionOperations';
import { reservationOperations } from './operations/reservationOperations';
import { getAccessToken } from './auth/getAccessToken';


export class ApaleoApi implements INodeType {
  description: INodeTypeDescription = {
    // Basic Node Information
    displayName: 'Apaleo',
    name: 'apaleoApi',
    subtitle: '={{$parameter["operation"]}}',
    icon: 'file:apaleo.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with Apaleo API',

    // Node Configuration
    defaults: {
      name: 'Apaleo API',
      color: '#1A82e2',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'apaleoApi', required: true }],

    // Node Properties
    "properties": [
    // Resource Selection
    {
      "displayName": "Resource",
      "name": "resource",
      "type": "options",
      "noDataExpression": true,
      "options": [
        { "name": "Booking", "value": "booking" },
        { "name": "Reservation", "value": "reservation" },
        { "name": "Reservation Action", "value": "reservation_action" }
      ],
      "default": "booking",
      "description": "Select the resource to interact with"
    },

    // === BOOKING OPERATIONS ===
    {
      "displayName": "Operation",
      "name": "operation",
      "type": "options",
      "options": [
        {
          "name": "POST Bookings",
          "value": "post_bookings",
          "description": "Endpoint: /booking/v1/bookings Creates a booking for one or more reservations",
          "action": "Create a booking"
        },
        {
          "name": "GET Bookings",
          "value": "get_bookings",
          "description": "Endpoint: /booking/v1/bookings Retrieve a list of bookings",
          "action": "Get bookings"
        },
        {
          "name": "GET Booking by ID",
          "value": "get_booking_by_id",
          "description": "Endpoint: /booking/v1/bookings/{id} Return a specific booking",
          "action": "Get a booking by ID"
        },
        {
          "name": "PATCH Booking by ID",
          "value": "patch_booking_by_id",
          "description": "Endpoint: /booking/v1/booking/{id} Allow to modify certain booking properties",
          "action": "Update a booking by ID"
        }
      ],
      "default": "get_booking_by_id",
      "noDataExpression": true,
      "displayOptions": {
        "show": {
          "resource": ["booking"]
        }
      }
    },

    // === RESERVATION OPERATIONS ===
    {
      "displayName": "Operation",
      "name": "operation",
      "type": "options",
      "options": [
        {
          "name": "GET Reservations",
          "value": "get_reservations",
          "description": "Endpoint: /booking/v1/reservations Returns a list of all reservations",
          "action": "Get reservations"
        },
        {
          "name": "GET Reservation by ID",
          "value": "get_reservation_by_id",
          "description": "Endpoint: /booking/v1/reservations/{id} Return a specific reservation",
          "action": "Get a reservation by ID"
        },
        {
          "name": "PATCH Reservation by ID",
          "value": "patch_reservation_by_id",
          "description": "Endpoint: /booking/v1/reservation/{id} Allow to modify certain reservation properties",
          "action": "Update a reservation by ID"
        }
      ],
      "default": "get_reservations",
      "noDataExpression": true,
      "displayOptions": {
        "show": {
          "resource": ["reservation"]
        }
      }
    },

    // === RESERVATION ACTIONS OPERATIONS ===
    {
      "displayName": "Operation",
      "name": "operation",
      "type": "options",
      "options": [
        {
          "name": "PUT Assign unit to reservation",
          "value": "put_assign_unit_to_reservation",
          "description": "Endpoint: /booking/v1/reservation-actions/{id}/assign-unit Assign unit to reservation",
          "action": "Assign unit to reservation"
        }
      ],
      "default": "put_assign_unit_to_reservation",
      "noDataExpression": true,
      "displayOptions": {
        "show": {
          "resource": ["reservation_action"]
        }
      }
    },

    // === SHARED PARAMETERS ===
    {
      "displayName": "Reservation ID",
      "name": "reservationId",
      "type": "string",
      "default": "",
      "description": "Filter bookings by reservation ID",
      "displayOptions": {
        "show": {
          "resource": ["reservation", "booking", "reservation_action"],
          "operation": ["get_reservations", "get_bookings", "put_assign_unit_to_reservation"]
        }
      }
    },

    {
      "displayName": "Unit Conditions",
      "name": "unitConditions",
      "type": "multiOptions",
      "options": [
        { "name": "Clean", "value": "Clean" },
        { "name": "Clean to Be Inspected", "value": "CleanToBeInspected" },
        { "name": "Dirty", "value": "Dirty" }
      ],
      "default": [],
      "description": "Optional unit conditions for the unit to assign.",
      "displayOptions": {
        "show": {
          "resource": ["reservation_action"],
          "operation": ["put_assign_unit_to_reservation"]
        }
      }
    },
			{
				displayName: 'External Code',
				name: 'externalCode',
				type: 'string',
				default: '',
				description: 'Filter bookings by external code',
				displayOptions: {
					show: {
						resource: ['booking', 'reservation'],
						operation: ['get_bookings', 'get_reservations'],
					},
				},
			},

			{
				displayName: 'Text Search',
				name: 'textSearch',
				type: 'string',
				default: '',
				description: 'Search text in bookings',
				displayOptions: {
					show: {
						resource: ['booking', 'reservation'],
						operation: ['get_bookings', 'get_reservations'],
					},
				},
			},

			{
				displayName: 'Page Number',
				name: 'pageNumber',
				type: 'number',
				default: 1,
				description: 'Page number for results, 1-based. Default is 1.',
				displayOptions: {
					show: {
						resource: ['booking', 'reservation'],
						operation: ['get_bookings', 'get_reservations'],
					},
				},
			},

			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 10,
				description: 'Number of items per page. If not set or not positive, all items are returned.',
				displayOptions: {
					show: {
						resource: ['booking', 'reservation'],
						operation: ['get_bookings', 'get_reservations'],
					},
				},
			},

      // === BOOKING-SPECIFIC PARAMETERS ===
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
        displayName: 'Group ID',
        name: 'groupId',
        type: 'string',
        default: '',
        description: 'Filter bookings by group ID',
        displayOptions: {
          show: {
            resource: ['booking'],
            operation: ['get_bookings'],
          },
        },
      },
      {
        displayName: 'Channel Code',
        name: 'channelCode',
        type: 'multiOptions',
        options: [
          { name: 'Direct', value: 'Direct' },
          { name: 'OTA', value: 'OTA' },
          { name: 'Ibe', value: 'Ibe' },
          { name: 'ChannelManager', value: 'ChannelManager' },
          { name: 'Expedia', value: 'Expedia' },
          { name: 'Homelike', value: 'Homelike' },
          { name: 'Hrs', value: 'Hrs' },
          { name: 'AltoVita', value: 'AltoVita' },
          { name: 'DesVu', value: 'DesVu' },
        ],
        default: [],
        description: 'Filter bookings by channel codes',
        displayOptions: {
          show: {
            resource: ['booking'],
            operation: ['get_bookings'],
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
                "childrenAges": [6],
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
                  { "ratePlanId": "MUC-NONREF-FAMILY" },
                  { "ratePlanId": "MUC-NONREF-FAMILY" }
                ],
                "services": [
                  { "serviceId": "MUC-BRKF" },
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
            operation: ['post_bookings'],
          },
        },
      },

      // === RESERVATION-SPECIFIC PARAMETERS ===
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
        displayName: 'Property IDs',
        name: 'propertyIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested properties',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Rate Plan IDs',
        name: 'ratePlanIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested rate plans',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Company IDs',
        name: 'companyIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested companies',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Unit IDs',
        name: 'unitIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by assigned units',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Unit Group IDs',
        name: 'unitGroupIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested unit groups',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Unit Group Types',
        name: 'unitGroupTypes',
        type: 'multiOptions',
        options: [
          { name: 'BedRoom', value: 'BedRoom' },
          { name: 'MeetingRoom', value: 'MeetingRoom' },
          { name: 'EventSpace', value: 'EventSpace' },
          { name: 'ParkingLot', value: 'ParkingLot' },
          { name: 'Other', value: 'Other' },
        ],
        default: [],
        description: 'Filter result by requested unit group types',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Block IDs',
        name: 'blockIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested blocks',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Market Segment IDs',
        name: 'marketSegmentIds',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by requested market segments',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'multiOptions',
        options: [
          { name: 'Confirmed', value: 'Confirmed' },
          { name: 'InHouse', value: 'InHouse' },
          { name: 'CheckedOut', value: 'CheckedOut' },
          { name: 'Canceled', value: 'Canceled' },
          { name: 'NoShow', value: 'NoShow' },
        ],
        default: [],
        description: 'Filter result by reservation status',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Date Filter',
        name: 'dateFilter',
        type: 'options',
        options: [
          { name: 'Arrival', value: 'Arrival' },
          { name: 'Departure', value: 'Departure' },
          { name: 'Stay', value: 'Stay' },
          { name: 'Creation', value: 'Creation' },
          { name: 'Modification', value: 'Modification' },
          { name: 'Cancellation', value: 'Cancellation' },
        ],
        default: '',
        description: 'Filter by date and time attributes of reservation',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'From',
        name: 'from',
        type: 'dateTime',
        default: '',
        description: 'The start of the time interval',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'To',
        name: 'to',
        type: 'dateTime',
        default: '',
        description: 'The end of the time interval, must be larger than "from"',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Channel Code',
        name: 'channelCode',
        type: 'multiOptions',
        options: [
          { name: 'Direct', value: 'Direct' },
          { name: 'BookingCom', value: 'BookingCom' },
          { name: 'Ibe', value: 'Ibe' },
          { name: 'ChannelManager', value: 'ChannelManager' },
          { name: 'Expedia', value: 'Expedia' },
          { name: 'Homelike', value: 'Homelike' },
          { name: 'Hrs', value: 'Hrs' },
          { name: 'AltoVita', value: 'AltoVita' },
          { name: 'DesVu', value: 'DesVu' },
        ],
        default: [],
        description: 'Filter result by the channel code',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Sources',
        name: 'sources',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: 'Filter result by source',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Validation Message Category',
        name: 'validationMessageCategory',
        type: 'multiOptions',
        options: [
          { name: 'OfferNotAvailable', value: 'OfferNotAvailable' },
          { name: 'AutoUnitAssignment', value: 'AutoUnitAssignment' },
        ],
        default: [],
        description: 'Filter result by validation message category',
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Balance Filter',
        name: 'balanceFilter',
        type: 'string',
        typeOptions: { multipleValues: true },
        default: [],
        description: `Filter reservations based on their balance. Provide expressions in the form 'OPERATION_VALUE' where OPERATION can be 'eq', 'neq', 'lt', 'gt', 'lte', 'gte'.`,
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'All Folios Have Invoice',
        name: 'allFoliosHaveInvoice',
        type: 'boolean',
        default: false,
        description: `If true, returns only reservations where all folios are closed and have an invoice. If false, returns reservations where some folios are open or lack an invoice.`,
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
          },
        },
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'multiOptions',
        options: [
          { name: 'arrival:asc', value: 'arrival:asc' },
          { name: 'arrival:desc', value: 'arrival:desc' },
          { name: 'departure:asc', value: 'departure:asc' },
          { name: 'departure:desc', value: 'departure:desc' },
          { name: 'created:asc', value: 'created:asc' },
          { name: 'created:desc', value: 'created:desc' },
          { name: 'updated:asc', value: 'updated:asc' },
          { name: 'updated:desc', value: 'updated:desc' },
          { name: 'id:asc', value: 'id:asc' },
          { name: 'id:desc', value: 'id:desc' },
          { name: 'firstname:asc', value: 'firstname:asc' },
          { name: 'firstname:desc', value: 'firstname:desc' },
          { name: 'lastname:asc', value: 'lastname:asc' },
          { name: 'lastname:desc', value: 'lastname:desc' },
          { name: 'unitname:asc', value: 'unitname:asc' },
          { name: 'unitname:desc', value: 'unitname:desc' },
        ],
        default: [],
        description: `Fields to sort the results. Multiple fields can be specified.`,
        displayOptions: {
          show: {
            resource: ['reservation'],
            operation: ['get_reservations'],
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
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const accessToken = await getAccessToken(this);

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;

      if (resource === 'booking') {
        await bookingOperations(this, i, operation, accessToken, returnData);
      } else if (resource === 'reservation') {
        await reservationOperations(this, i, operation, accessToken, returnData);
      } else if (resource === 'reservation_action') {
        await reservationActionsOperations(this, i, operation, accessToken, returnData);
      }
    }
    return this.prepareOutputData(returnData);
  }
}
