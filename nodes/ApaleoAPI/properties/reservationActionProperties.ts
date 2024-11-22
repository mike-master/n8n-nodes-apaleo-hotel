import { INodeProperties } from 'n8n-workflow';

export const reservationActionProperties: INodeProperties[] = [
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "options": [
      {
        "name": "PUT assign unit to reservation",
        "value": "PUT assign unit to reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/assign-unit Assign unit to reservation",
        "action": "PUT assign unit to reservation"
      },
			{
        "name": "PUT unassign unit from reservation",
        "value": "PUT unassign unit from reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/unassign-unit Assign unit to reservation",
        "action": "PUT unassign unit from reservation"
      }
    ],
    "default": "PUT assign unit to reservation",
    "noDataExpression": true,
    "displayOptions": {
      "show": {
        "resource": ["reservation_action"]
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
        "resource": ["reservation_action"],
        "operation": ["PUT assign unit to reservation", "PUT unassign unit from reservation"]
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
        "operation": ["PUT assign unit to reservation"]
      }
    }
  },
];
