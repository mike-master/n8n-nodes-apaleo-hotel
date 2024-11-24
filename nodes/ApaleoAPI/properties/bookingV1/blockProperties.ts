import { INodeProperties } from 'n8n-workflow';

export const blockProperties: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    options: [
      {
        name: "POST create block",
        value: "POST create block",
        description: "Endpoint: /booking/v1/blocks Creates a new block",
        action: "POST create block"
      },
      {
        name: "GET blocks",
        value: "GET blocks",
        description: "Endpoint: /booking/v1/blocks Returns a list of blocks",
        action: "GET blocks"
      },
      {
        name: "GET block count",
        value: "GET block count",
        description: "Endpoint: /booking/v1/blocks/$count Returns the count of blocks matching the criteria",
        action: "GET block count" 
      },
      {
        name: "GET block",
        value: "GET block",
        description: "Endpoint: /booking/v1/blocks/{id} Returns a specific block by ID",
        action: "GET block"
      },
      {
        name: "HEAD block exists",
        value: "HEAD block exists",
        description: "Endpoint: /booking/v1/blo cks/{id} Check if a block exists",
        action: "HEAD block exists"
      },
      {
        name: "DELETE block",
        value: "DELETE block",
        description: "Endpoint: /booking/v1/blocks/{id} Delete a specific block. Only possible if no reservation was picked up yet.",
        action: "DELETE block"
      }
    ],
    default: "GET blocks",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["block"]
      }
    }
  },
  // Fields for GET blocks operation
  {
    displayName: "Property IDs",
    name: "propertyIds",
    type: "string",
    default: "",
    description: "Comma-separated list of property IDs to filter by",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["GET blocks", "GET block count"]
      }
    }
  },
  {
    displayName: "From Date",
    name: "from",
    type: "dateTime",
    default: "",
    description: "Filter blocks starting from this date",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["GET blocks", "GET block count"]
      }
    }
  },
  {
    displayName: "To Date",
    name: "to",
    type: "dateTime",
    default: "",
    description: "Filter blocks until this date",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["GET blocks", "GET block count"]
      }
    }
  },
  {
    displayName: "Status",
    name: "status",
    type: "multiOptions",
    options: [
      { name: "Tentative", value: "Tentative" },
      { name: "Definite", value: "Definite" },
      { name: "Canceled", value: "Canceled" }
    ],
    default: [],
    description: "Filter blocks by status",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["GET blocks", "GET block count"]
      }
    }
  },
  // Fields for POST create block operation
  {
    displayName: "Group ID",
    name: "groupId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the group this block belongs to",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "Property ID",
    name: "propertyId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the property where the block should be created",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "Rate Plan ID",
    name: "ratePlanId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the rate plan for the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "Unit Group ID",
    name: "unitGroupId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the unit group for the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "From Date",
    name: "fromDate",
    type: "dateTime",
    default: "",
    required: true,
    description: "Start date of the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "To Date",
    name: "toDate",
    type: "dateTime",
    default: "",
    required: true,
    description: "End date of the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "Gross Daily Rate",
    name: "grossDailyRate",
    type: "number",
    default: 0,
    required: true,
    description: "Gross daily rate for the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  {
    displayName: "Currency",
    name: "currency",
    type: "string",
    default: "EUR",
    required: true,
    description: "Currency for the gross daily rate",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["POST create block"]
      }
    }
  },
  // Fields for GET block and HEAD block exists operations
  {
    displayName: "Block ID",
    name: "blockId",
    type: "string",
    default: "",
    required: true,
    description: "ID of the block",
    displayOptions: {
      show: {
        resource: ["block"],
        operation: ["GET block", "HEAD block exists", "DELETE block"]
      }
    }
  }
];
