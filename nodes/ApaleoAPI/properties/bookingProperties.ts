import { INodeProperties } from 'n8n-workflow';

export const bookingProperties: INodeProperties[] = [
	{
		"displayName": "Operation",
		"name": "operation",
		"type": "options",
		"options": [
			{
				"name": "POST bookings",
				"value": "POST bookings",
				"description": "Endpoint: /booking/v1/bookings Creates a booking for one or more reservations",
				"action": "POST a booking"
			},
			{
				"name": "GET bookings",
				"value": "GET bookings",
				"description": "Endpoint: /booking/v1/bookings Retrieve a list of bookings",
				"action": "GET bookings"
			},
			{
				"name": "GET booking by ID",
				"value": "GET booking by ID",
				"description": "Endpoint: /booking/v1/bookings/{id} Return a specific booking",
				"action": "GET booking by ID"
			},
			{
				"name": "PATCH booking by ID",
				"value": "PATCH booking by ID",
				"description": "Endpoint: /booking/v1/booking/{id} Allow to modify certain booking properties",
				"action": "PATCH booking by ID"
			}
		],
		"default": "GET booking by ID",
		"noDataExpression": true,
		"displayOptions": {
			"show": {
				"resource": ["booking"]
			}
		}
	},
	{
		"displayName": "Reservation ID",
		"name": "reservationId",
		"type": "string",
		"default": "",
		"description": "Filter bookings by reservation ID",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "External Code",
		"name": "externalCode",
		"type": "string",
		"default": "",
		"description": "Filter bookings by external code",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "Text Search",
		"name": "textSearch",
		"type": "string",
		"default": "",
		"description": "Search text in bookings",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "Page Number",
		"name": "pageNumber",
		"type": "number",
		"default": 1,
		"description": "Page number for results, 1-based. Default is 1.",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "Page Size",
		"name": "pageSize",
		"type": "number",
		"default": 10,
		"description": "Number of items per page. If not set or not positive, all items are returned.",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "booking ID",
		"name": "bookingId",
		"type": "string",
		"required": true,
		"default": "",
		"description": "The ID of the booking to retrieve or modify",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET booking by ID", "PATCH booking by ID"]
			}
		}
	},
	{
		"displayName": "Group ID",
		"name": "groupId",
		"type": "string",
		"default": "",
		"description": "Filter bookings by group ID",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "Channel Code",
		"name": "channelCode",
		"type": "multiOptions",
		"options": [
			{ "name": "AltoVita", "value": "AltoVita" },
			{ "name": "ChannelManager", "value": "ChannelManager" },
			{ "name": "DesVu", "value": "DesVu" },
			{ "name": "Expedia", "value": "Expedia" },
			{ "name": "Homelike", "value": "Homelike" },
			{ "name": "Hrs", "value": "Hrs" },
			{ "name": "Ibe", "value": "Ibe" },
			{ "name": "OTA", "value": "OTA" },
			{ "name": "Direct", "value": "Direct" }
		],
		"default": [],
		"description": "Filter bookings by channel codes",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["GET bookings"]
			}
		}
	},
	{
		"displayName": "Expand (booking)",
		"name": "expandbooking",
		"type": "multiOptions",
		"options": [
			{ "name": "property", "value": "property" },
			{ "name": "unitGroup", "value": "unitGroup" },
			{ "name": "ratePlan", "value": "ratePlan" },
			{ "name": "services", "value": "services" },
			{ "name": "reservations", "value": "reservations" },
			{ "name": "propertyValues", "value": "propertyValues" }
		],
		"default": [],
		"description": "List of all embedded resources to expand in the booking response",
		"displayOptions": {
			"show": {
				"operation": ["GET booking by ID"]
			}
		}
	},
	{
		"displayName": "PATCH Operations (booking)",
		"name": "PATCHOperationsbooking",
		"type": "json",
		"required": true,
		"default": `[
			{
				"op": "string",
				"path": "string",
				"value": "string",
				"from": "string"
			}
		]`,
		"description": "JSON PATCH operations for booking modifications",
		"displayOptions": {
			"show": {
				"operation": ["PATCH booking by ID"]
			}
		}
	},
	{
		"displayName": "Reservations Data",
		"name": "reservationsData",
		"type": "json",
		"required": true,
		"default": `[
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
		"description": "JSON array of reservation objects to create the booking",
		"displayOptions": {
			"show": {
				"resource": ["booking"],
				"operation": ["POST bookings"]
			}
		}
	}
];
