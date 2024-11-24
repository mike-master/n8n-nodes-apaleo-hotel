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
        "name": "PUT assign specific unit to reservation",
        "value": "PUT assign specific unit to reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/assign-unit/{unitId} Assign specific unit to reservation",
        "action": "PUT assign specific unit to reservation"
      },
      {
        "name": "PUT unassign unit from reservation",
        "value": "PUT unassign unit from reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/unassign-unit Unassign unit from reservation",
        "action": "PUT unassign unit from reservation"
      },
      {
        "name": "PUT checkin reservation",
        "value": "PUT checkin reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/checkin Check in a reservation",
        "action": "PUT checkin reservation"
      },
      {
        "name": "PUT checkout reservation",
        "value": "PUT checkout reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/checkout Check out a reservation",
        "action": "PUT checkout reservation"
      },
      {
        "name": "PUT cancel reservation",
        "value": "PUT cancel reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/cancel Cancel a reservation",
        "action": "PUT cancel reservation"
      },
      {
        "name": "PUT mark reservation as no-show",
        "value": "PUT mark reservation as no-show",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/noshow Mark a reservation as no-show",
        "action": "PUT mark reservation as no-show"
      },
      {
        "name": "PUT amend reservation",
        "value": "PUT amend reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/amend/$force Amend a reservation",
        "action": "PUT amend reservation"
      },
      {
        "name": "PUT book service for reservation",
        "value": "PUT book service for reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/book-service/$force Book a service for a reservation",
        "action": "PUT book service for reservation"
      },
      {
        "name": "PUT add city tax to reservation",
        "value": "PUT add city tax to reservation",
        "description": "Endpoint: /booking/v1/reservation-actions/{id}/add-city-tax Add city tax to a reservation",
        "action": "PUT add city tax to reservation"
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
        "operation": [
          "PUT assign unit to reservation",
          "PUT assign specific unit to reservation",
          "PUT unassign unit from reservation",
          "PUT checkin reservation",
          "PUT checkout reservation",
          "PUT cancel reservation",
          "PUT mark reservation as no-show",
          "PUT amend reservation",
          "PUT book service for reservation",
          "PUT add city tax to reservation"
        ]
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
  {
    "displayName": "Unit ID",
    "name": "unitId",
    "type": "string",
    "default": "",
    "required": true,
    "description": "The ID of the unit to be assigned",
    "displayOptions": {
      "show": {
        "resource": ["reservation_action"],
        "operation": ["PUT assign specific unit to reservation"]
      }
    }
  },
  {
    "displayName": "From",
    "name": "from",
    "type": "string",
    "default": "",
    "description": "The start date and optional time for the unit assignment. If not specified, the reservation's arrival will be used. Specify either a pure date or a date and time (without fractional second part) in UTC or with UTC offset as defined in ISO8601:2004",
    "displayOptions": {
      "show": {
        "resource": ["reservation_action"],
        "operation": ["PUT assign specific unit to reservation"]
      }
    }
  },
  {
    "displayName": "To",
    "name": "to",
    "type": "string",
    "default": "",
    "description": "The end date and optional time for the unit assignment. If not specified, the reservation's departure will be used. Specify either a pure date or a date and time (without fractional second part) in UTC or with UTC offset as defined in ISO8601:2004",
    "displayOptions": {
      "show": {
        "resource": ["reservation_action"],
        "operation": ["PUT assign specific unit to reservation"]
      }
    }
  },
  {
    "displayName": "With City Tax",
    "name": "withCityTax",
    "type": "boolean",
    "default": true,
    "description": "Define if city tax should be added for this reservation or not. The default is true.",
    "displayOptions": {
      "show": {
        "resource": ["reservation_action"],
        "operation": ["PUT checkin reservation"]
      }
    }
  }
];
