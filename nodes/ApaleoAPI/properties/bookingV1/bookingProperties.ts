import { INodeProperties } from 'n8n-workflow';

export const bookingProperties: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    options: [
      {
        name: "POST bookings",
        value: "POST bookings",
        description: "Endpoint: /booking/v1/bookings Creates a booking for one or more reservations",
        action: "POST create booking"
      },
      {
        name: "POST bookings force",
        value: "POST bookings force",
        description: "Endpoint: /booking/v1/bookings$force Creates a booking regardless of availability or restrictions",
        action: "POST force create booking"
      },
      {
        name: "GET Bookings",
        value: "GET bookings",
        description: "Endpoint: /booking/v1/bookings Returns a list of all bookings",
        action: "GET bookings"
      },
      {
        name: "GET Booking",
        value: "GET booking",
        description: "Endpoint: /booking/v1/bookings/{id} Returns a specific booking",
        action: "GET booking"
      },
      {
        name: "POST Reservations",
        value: "POST booking reservations",
        description: "Endpoint: /booking/v1/bookings/{id}/reservations Add reservations to an existing booking",
        action: "POST add reservations"
      },
      {
        name: "POST Force Add Reservations",
        value: "POST booking reservations force",
        description: "Endpoint: /booking/v1/bookings/{id}/reservations$force Add reservations regardless of availability",
        action: "POST force add reservations"
      },
      {
        name: "PATCH Booking",
        value: "PATCH booking",
        description: "Endpoint: /booking/v1/bookings/{id} Modify booking properties",
        action: "PATCH update booking"
      }
    ],
    default: "GET bookings",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["booking"]
      }
    }
  },
  {
	  displayName: "Booking ID",
	  name: "bookingId",
	  type: "string",
	  required: true,
	  description: "ID of the booking",
	  displayOptions: {
		  show: {
			  resource: ["booking"],
			  operation: [
				  "GET booking",
				  "POST booking reservations",
				  "POST booking reservations force",
				  "PATCH booking"
			  ]
		  }
	  },
	  default: undefined
  },
  {
    displayName: "Booking Details",
    name: "bookingDetails",
    type: "json",
    required: true,
    default: "",
    description: "The booking details in JSON format",
    displayOptions: {
      show: {
        resource: ["booking"],
        operation: ["POST bookings", "POST bookings force"]
      }
    }
  },
  {
    displayName: "Reservations",
    name: "reservations",
    type: "json",
    required: true,
    default: "",
    description: "The reservations to add in JSON format",
    displayOptions: {
      show: {
        resource: ["booking"],
        operation: ["POST booking reservations", "POST booking reservations force"]
      }
    }
  },
  {
    displayName: "Update Operations",
    name: "updateOperations",
    type: "json",
    required: true,
    default: "",
    description: "JSON patch operations to apply (see http://jsonpatch.com/)",
    displayOptions: {
      show: {
        resource: ["booking"],
        operation: ["PATCH booking"]
      }
    }
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: {
        resource: ["booking"],
        operation: ["GET bookings"]
      }
    },
    options: [
      {
        displayName: "Reservation ID",
        name: "reservationId",
        type: "string",
        default: "",
        description: "Filter by reservation ID"
      },
      {
        displayName: "Group ID",
        name: "groupId",
        type: "string",
        default: "",
        description: "Filter by group ID"
      },
      {
        displayName: "Channel Code",
        name: "channelCode",
        type: "multiOptions",
        options: [
          { name: "Direct", value: "Direct" },
          { name: "Booking.com", value: "BookingCom" },
          { name: "IBE", value: "Ibe" },
          { name: "Channel Manager", value: "ChannelManager" },
          { name: "Expedia", value: "Expedia" },
          { name: "Homelike", value: "Homelike" },
          { name: "HRS", value: "Hrs" },
          { name: "AltoVita", value: "AltoVita" },
          { name: "DesVu", value: "DesVu" }
        ],
        default: [],
        description: "Filter by channel code"
      },
      {
        displayName: "External Code",
        name: "externalCode",
        type: "string",
        default: "",
        description: "Filter by external code"
      },
      {
        displayName: "Text Search",
        name: "textSearch",
        type: "string",
        default: "",
        description: "Search in lastname, firstname, email or company name"
      },
      {
        displayName: "Page Number",
        name: "pageNumber",
        type: "number",
        default: 1,
        description: "Page number (1-based)"
      },
      {
        displayName: "Page Size",
        name: "pageSize",
        type: "number",
        default: 100,
        description: "Number of items per page"
      },
      {
        displayName: "Expand",
        name: "expand",
        type: "multiOptions",
        options: [
          { name: "Property", value: "property" },
          { name: "Unit Group", value: "unitGroup" },
          { name: "Rate Plan", value: "ratePlan" },
          { name: "Services", value: "services" },
          { name: "Reservations", value: "reservations" },
          { name: "Property Values", value: "propertyValues" }
        ],
        default: [],
        description: "Expand additional booking information"
      }
    ]
  }
];
