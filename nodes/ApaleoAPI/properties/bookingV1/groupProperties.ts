import { INodeProperties } from 'n8n-workflow';

export const groupProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['group'],
      },
    },
    options: [
      {
        name: 'GET count groups',
        value: 'GET count groups',
        description: 'Endpoint: /booking/v1/groups/$count Count the group bookings',
        action: 'GET count groups',
      },
      {
        name: 'POST group',
        value: 'POST group',
        description: 'Endpoint: /booking/v1/groups Create a new group booking',
        action: 'POST group',
      },
      {
        name: 'POST group reservations',
        value: 'POST group reservations',
        description: 'Endpoint: /booking/v1/group-reservations Add reservations to a group booking',
        action: 'POST group reservations',
      },
      {
        name: 'DELETE group',
        value: 'DELETE group',
        description: 'Endpoint: /booking/v1/groups Delete a group booking',
        action: 'DELETE group',
      },
      {
        name: 'GET group',
        value: 'GET group',
        description: 'Endpoint: /booking/v1/groups Get a specific group booking',
        action: 'GET group',
      },
      {
        name: 'GET groups',
        value: 'GET groups',
        description: 'Endpoint: /booking/v1/groups Get all group bookings',
        action: 'GET groups',
      },
      {
        name: 'PATCH group',
        value: 'PATCH group',
        description: 'Endpoint: /booking/v1/groups Update a group booking',
        action: 'PATCH group',
      },
    ],
    default: 'GET groups',
  },
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET group', 'PATCH group', 'DELETE group', 'POST group reservations'],
      },
    },
    default: '',
    description: 'The ID of the group booking',
  },
  {
    displayName: 'Text Search',
    name: 'textSearch',
    type: 'string',
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups', 'GET count groups'],
      },
    },
    default: '',
    description: 'Search text to filter groups by name, lastname, firstname, email or company name',
  },
  {
    displayName: 'Property IDs',
    name: 'propertyIds',
    type: 'string',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups', 'GET count groups'],
      },
    },
    default: [],
    description: 'Filter groups by property IDs',
  },
  {
    displayName: 'From',
    name: 'from',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups', 'GET count groups'],
      },
    },
    default: '',
    description: 'Start date for filtering groups',
  },
  {
    displayName: 'To',
    name: 'to',
    type: 'dateTime',
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups', 'GET count groups'],
      },
    },
    default: '',
    description: 'End date for filtering groups',
  },
  {
    displayName: 'Page Number',
    name: 'pageNumber',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups'],
      },
    },
    default: 1,
    description: 'Page number for pagination',
  },
  {
    displayName: 'Page Size',
    name: 'pageSize',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups'],
      },
    },
    default: 100,
    description: 'Number of items per page',
  },
  {
    displayName: 'Expand',
    name: 'expand',
    type: 'multiOptions',
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['GET groups', 'GET group'],
      },
    },
    options: [
      {
        name: 'Blocks',
        value: 'blocks',
      },
      {
        name: 'Actions',
        value: 'actions',
      },
    ],
    default: [],
    description: 'Additional data to include in the response',
  },
  {
    displayName: 'Group Data',
    name: 'groupData',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['POST group'],
      },
    },
    default: '',
    description: 'Group data in JSON format',
  },
  {
    displayName: 'Operations',
    name: 'operations',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['PATCH group'],
      },
    },
    default: '',
    description: 'Operations to perform on the group in JSON Patch format',
  },
  {
    displayName: 'reservations Data',
    name: 'reservationsData',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['POST group reservations'],
      },
    },
    default: '',
    description: 'reservations data in JSON format',
  },
];
