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
			},
			{
				"name": "GET reservation count",
				"value": "GET reservation count",
				"description": "Endpoint: /booking/v1/reservations/$count Returns the count of reservations",
				"action": "GET reservation count"
			},
			{
				"name": "GET reservation offers",
				"value": "GET reservation offers",
				"description": "Endpoint: /booking/v1/reservations/{id}/offers Returns offers for a reservation",
				"action": "GET reservation offers"
			},
			{
				"name": "GET reservation service offers",
				"value": "GET reservation service offers",
				"description": "Endpoint: /booking/v1/reservations/{id}/service-offers Returns service offers for a reservation",
				"action": "GET reservation service offers"
			},
			{
				"name": "GET reservation services",
				"value": "GET reservation services",
				"description": "Endpoint: /booking/v1/reservations/{id}/services Returns services for a reservation",
				"action": "GET reservation services"
			},
			{
				"name": "DELETE reservation service",
				"value": "DELETE reservation service",
				"description": "Endpoint: /booking/v1/reservations/{id}/services Removes a service from a reservation",
				"action": "DELETE reservation service"
			}
		],
		"default": "GET reservations",
		"noDataExpression": true,
		"required": true,
		"description": "The operation to perform"
	},
	{
		"displayName": "reservation ID",
		"name": "reservationId",
		"type": "string",
		"required": true,
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservation by ID", "PATCH reservation by ID", "GET reservation offers", "GET reservation service offers", "GET reservation services", "DELETE reservation service"]
			}
		},
		"default": "",
		"description": "The ID of the reservation to retrieve or modify"
	},
	{
		"displayName": "Service ID",
		"name": "serviceId",
		"type": "string",
		"required": true,
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["DELETE reservation service"]
			}
		},
		"default": "",
		"description": "The ID of the service to delete"
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
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
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Market Segment IDs",
		"name": "marketSegmentIds",
		"type": "string",
		"typeOptions": { "multipleValues": true },
		"default": [],
		"description": "Filter result by market segments",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Status",
		"name": "status",
		"type": "multiOptions",
		"options": [
			{ "name": "Confirmed", "value": "Confirmed" },
			{ "name": "Canceled", "value": "Canceled" },
			{ "name": "CheckedIn", "value": "CheckedIn" },
			{ "name": "CheckedOut", "value": "CheckedOut" },
			{ "name": "NoShow", "value": "NoShow" }
		],
		"default": [],
		"description": "Filter result by reservation status",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Date Filter",
		"name": "dateFilter",
		"type": "options",
		"options": [
			{ "name": "Arrival", "value": "Arrival" },
			{ "name": "Departure", "value": "Departure" },
			{ "name": "Stay", "value": "Stay" },
			{ "name": "Created", "value": "Created" },
			{ "name": "Modified", "value": "Modified" }
		],
		"default": "Stay",
		"description": "The type of date to filter by",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "From Date",
		"name": "from",
		"type": "dateTime",
		"default": "",
		"description": "Start date for the filter",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "To Date",
		"name": "to",
		"type": "dateTime",
		"default": "",
		"description": "End date for the filter",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Channel Code",
		"name": "channelCode",
		"type": "multiOptions",
		"options": [
			{ "name": "Direct", "value": "Direct" },
			{ "name": "BookingCom", "value": "BookingCom" },
			{ "name": "Expedia", "value": "Expedia" },
			{ "name": "HRS", "value": "HRS" },
			{ "name": "GDS", "value": "GDS" }
		],
		"default": [],
		"description": "Filter by channel code",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Sources",
		"name": "sources",
		"type": "multiOptions",
		"options": [
			{ "name": "Web", "value": "Web" },
			{ "name": "Mobile", "value": "Mobile" },
			{ "name": "CRS", "value": "CRS" },
			{ "name": "PMS", "value": "PMS" }
		],
		"default": [],
		"description": "Filter by reservation source",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "External Code",
		"name": "externalCode",
		"type": "string",
		"default": "",
		"description": "Filter by external code",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Text Search",
		"name": "textSearch",
		"type": "string",
		"default": "",
		"description": "Search text in reservations",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation count"]
			}
		}
	},
	{
		"displayName": "Page Number",
		"name": "pageNumber",
		"type": "number",
		"default": 1,
		"description": "Page number for results",
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
		"default": 100,
		"description": "Number of items per page",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations"]
			}
		}
	},
	{
		"displayName": "Expand",
		"name": "expand",
		"type": "multiOptions",
		"options": [
			{ "name": "Property", "value": "property" },
			{ "name": "Unit Group", "value": "unitGroup" },
			{ "name": "Rate Plan", "value": "ratePlan" },
			{ "name": "Services", "value": "services" },
			{ "name": "Company", "value": "company" },
			{ "name": "Block", "value": "block" }
		],
		"default": [],
		"description": "Expand additional information",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["GET reservations", "GET reservation by ID"]
			}
		}
	},
	{
		"displayName": "Patch Operations reservation",
		"name": "patchOperationsreservation",
		"type": "json",
		"default": `[
			{
				"op": "replace",
				"path": "/path/to/field",
				"value": "new value"
			}
		]`,
		"description": "PATCH operations in JSON format",
		"displayOptions": {
			"show": {
				"resource": ["reservation"],
				"operation": ["PATCH reservation by ID"]
			}
		}
	}
];
