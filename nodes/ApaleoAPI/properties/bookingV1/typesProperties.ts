import { INodeProperties } from 'n8n-workflow';

export const typesProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['types'],
      },
    },
    options: [
      {
        name: 'GET sources',
        value: 'GET sources',
        description: 'Endpoint: /booking/v1/types/sources Returns a list of channels that could be used as a source to create bookings',
        action: 'GET sources',
      },
      {
        name: 'GET allowed values',
        value: 'GET allowed values',
        description: 'Endpoint: /booking/v1/types/{type}/allowed-values Returns a list of values that a field of the specified type can take in the specified country',
        action: 'GET allowed values',
      },
    ],
    default: 'GET sources',
    required: true,
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    default: 'Gender',
    options: [
      {
        name: 'Gender',
        value: 'Gender',
      },
      {
        name: 'Identification Type',
        value: 'IdentificationType',
      },
    ],
    description: 'The type to provide allowed values for',
    displayOptions: {
      show: {
        resource: ['types'],
        operation: ['GET allowed values'],
      },
    },
  },
  {
    displayName: 'Country Code',
    name: 'countryCode',
    type: 'string',
    required: true,
    default: '',
    description: 'The code of the country in which the property is located in ISO 3166-1 alpha-2 format',
    displayOptions: {
      show: {
        resource: ['types'],
        operation: ['GET allowed values'],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['types'],
        operation: ['GET allowed values'],
      },
    },
    options: [
      {
        displayName: 'Text Search',
        name: 'textSearch',
        type: 'string',
        default: '',
        description: 'Filter the result by the provided free text. If specified, only values that contain one of the provided values will be returned',
      },
      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Page number, 1-based. Default value is 1',
      },
      {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        default: 100,
        description: 'Page size. If this is not set or not positive, the pageNumber is ignored and all items are returned',
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'multiOptions',
        options: [
          {
            name: 'Value Ascending',
            value: 'value:asc',
          },
          {
            name: 'Value Descending',
            value: 'value:desc',
          },
        ],
        default: [],
        description: 'Sort order',
      },
    ],
  },
];
