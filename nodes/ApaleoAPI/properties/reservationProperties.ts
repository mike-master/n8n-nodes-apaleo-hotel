import { INodeProperties } from 'n8n-workflow';

export const reservationProperties: INodeProperties[] = [
	{
		"displayName": "Operation",
		"name": "operation",
		"type": "options",
		"options": [
			{
				"name": "GET reservations",
				"value": "GET reservations",
				"description": "Endpoint: /booking/v1/reservations Returns a list of all reservations",
				"action": "GET reservations"
			},
			{
				"name": "GET reservation by ID",
				"value": "GET reservation by ID",
				"description": "Endpoint: /booking/v1/reservations/{id} Return a specific reservation",
				"action": "GET reservation by ID"
			},
			{
				"name": "PATCH reservation by ID",
				"value": "PATCH reservation by ID",
				"description": "Endpoint: /booking/v1/reservation/{id} Allow to modify certain reservation properties",
				"action": "PATCH reservation by ID"
			}
		],
		"default": "GET reservations",
		"noDataExpression": true,
		"displayOptions": {
			"show": {
				"resource": ["reservation"]
			}
		}
	},
	{
		"displayName": "reservation ID",
		"name": "reservationId",
		"type": "string",
		"default": "",
		"description": "Filter bookings by reservation ID",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
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
				"resource": ["reservation"],
				"operation": ["GET reservations"]
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
				"resource": ["reservation"],
				"operation": ["GET reservations"]
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
				"resource": ["reservation"],
				"operation": ["GET reservations"]
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
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "reservation ID",
		"name": "reservationId",
		"type": "string",
		"required": true,
		"default": "",
		"description": "The ID of the reservation to retrieve or modify",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservation by ID", "PATCH reservation by ID"]
			}
		}
	},
	{
		"displayName": "Property IDs",
		"name": "propertyIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested properties",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Rate Plan IDs",
		"name": "ratePlanIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested rate plans",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Company IDs",
		"name": "companyIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested companies",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Unit IDs",
		"name": "unitIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by assigned units",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Unit Group IDs",
		"name": "unitGroupIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested unit groups",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Unit Group Types",
		"name": "unitGroupTypes",
		"type": "multiOptions",
		"options": [
			{ "name": "BedRoom", "value": "BedRoom" },
			{ "name": "MeetingRoom", "value": "MeetingRoom" },
			{ "name": "EventSpace", "value": "EventSpace" },
			{ "name": "ParkingLot", "value": "ParkingLot" },
			{ "name": "Other", "value": "Other" }
		],
		"default": [],
		"description": "Filter result by requested unit group types",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Block IDs",
		"name": "blockIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested blocks",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Market Segment IDs",
		"name": "marketSegmentIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by requested market segments",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Status",
		"name": "status",
		"type": "multiOptions",
		"options": [
			{ "name": "Confirmed", "value": "Confirmed" },
			{ "name": "InHouse", "value": "InHouse" },
			{ "name": "CheckedOut", "value": "CheckedOut" },
			{ "name": "NoShow", "value": "NoShow" },
			{ "name": "Cancelled", "value": "Cancelled" }
		],
		"default": [],
		"description": "Filter result by reservation status",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Patch Operations reservation",
		"name": "patchOperationsreservation",
		"type": "json",
		"default": '{"reservationId": "", "status": "Confirmed"}',
		"description": "Provide the JSON body to update reservation details",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["PATCH reservation by ID"]
			}
		}
	}
];
