import { INodeProperties } from 'n8n-workflow';

export const folioProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['folio'],
      },
    },
    options: [
      {
        name: 'GET folios',
        value: 'GET folios',
        description: 'Endpoint: /finance/v1/folios Returns a list of all folios',
        action: 'GET folios',
      },
      {
        name: 'GET folio',
        value: 'GET folio',
        description: 'Endpoint: /finance/v1/folios/{id} Returns one folio',
        action: 'GET folio',
      },
      {
        name: 'GET count folios',
        value: 'GET count folios',
        description: 'Endpoint: /finance/v1/folios/$count Returns number of folios',
        action: 'GET count folios',
      },
      {
        name: 'POST folio',
        value: 'POST folio',
        description: 'Endpoint: /finance/v1/folios Create additional folios for a reservation, or new external folios',
        action: 'POST folio',
      },
      {
        name: 'PATCH folio',
        value: 'PATCH folio',
        description: 'Endpoint: /finance/v1/folios/{id} Allows to modify certain properties of a folio',
        action: 'PATCH folio',
      },
      {
        name: 'HEAD folio exists',
        value: 'HEAD folio exists',
        description: 'Endpoint: /finance/v1/folios/{id} Check if the folio exists',
        action: 'HEAD folio exists',
      },
      {
        name: 'DELETE folio',
        value: 'DELETE folio',
        description: 'Endpoint: /finance/v1/folios/{id} Deletes a folio',
        action: 'DELETE folio',
      },
    ],
    default: 'GET folios',
    noDataExpression: true,
  },
  // Properties for GET folios
  {
    displayName: 'Property IDs',
    name: 'propertyIds',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folio list by property IDs',
  },
  {
    displayName: 'Company IDs',
    name: 'companyIds',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folio list by company IDs',
  },
  {
    displayName: 'Reservation IDs',
    name: 'reservationIds',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folio list by reservation IDs',
  },
  {
    displayName: 'Booking IDs',
    name: 'bookingIds',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folio list by booking IDs',
  },
  {
    displayName: 'Is Empty',
    name: 'isEmpty',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: false,
    description: 'If true, only return empty folios (no unmoved charges, no unmoved payments, no allowances)',
  },
  {
    displayName: 'Checked Out On Accounts Receivable',
    name: 'checkedOutOnAccountsReceivable',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: false,
    description: 'If true, only return folios that have been checked out on accounts receivables',
  },
  {
    displayName: 'Exclude Closed',
    name: 'excludeClosed',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: false,
    description: 'If true, closed folios are filtered out from the result collection',
  },
  {
    displayName: 'Has Invoices',
    name: 'hasInvoices',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: false,
    description: 'If true, only return folios that been invoices',
  },
  {
    displayName: 'Created From',
    name: 'createdFrom',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'The inclusive start time of the date of creation',
  },
  {
    displayName: 'Created To',
    name: 'createdTo',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'The exclusive end time of the date of creation',
  },
  {
    displayName: 'Updated From',
    name: 'updatedFrom',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'The inclusive start time of the date of the last update',
  },
  {
    displayName: 'Updated To',
    name: 'updatedTo',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'The exclusive end time of the date of the last update',
  },
  {
    displayName: 'Only Main',
    name: 'onlyMain',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: false,
    description: 'If true, only main folios are returned',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    options: [
      {
        name: 'House',
        value: 'House',
      },
      {
        name: 'Guest',
        value: 'Guest',
      },
      {
        name: 'External',
        value: 'External',
      },
      {
        name: 'Booking',
        value: 'Booking',
      },
    ],
    default: 'Guest',
    description: 'The type of the folio',
  },
  {
    displayName: 'External Folio Code',
    name: 'externalFolioCode',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Allows filtering external folios by code',
  },
  {
    displayName: 'Text Search',
    name: 'textSearch',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folios by debitor first/last name, company name, or folio ID',
  },
  {
    displayName: 'Balance Filter',
    name: 'balanceFilter',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios', 'GET count folios'],
      },
    },
    default: '',
    description: 'Filter folios based on their balance (e.g., eq_5, lte_7)',
  },
  {
    displayName: 'Page Number',
    name: 'pageNumber',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios'],
      },
    },
    default: 1,
    description: 'Page number (1-based)',
  },
  {
    displayName: 'Page Size',
    name: 'pageSize',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folios'],
      },
    },
    default: 100,
    description: 'Number of items per page',
  },
  // Properties for specific folio operations
  {
    displayName: 'Folio ID',
    name: 'id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['GET folio', 'PATCH folio', 'HEAD folio exists', 'DELETE folio'],
      },
    },
    default: '',
    description: 'The ID of the folio',
  },
  {
    displayName: 'Folio Data',
    name: 'data',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['POST folio'],
      },
    },
    default: '',
    description: 'The definition of the folio in JSON format',
  },
  {
    displayName: 'Update Operations',
    name: 'updateOperations',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['folio'],
        operation: ['PATCH folio'],
      },
    },
    default: '',
    description: 'Define the list of operations to be applied to the folio in JSON Patch format',
  },
];
