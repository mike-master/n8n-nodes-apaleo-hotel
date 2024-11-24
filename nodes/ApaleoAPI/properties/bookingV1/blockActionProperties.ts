import { INodeProperties } from 'n8n-workflow';

export const blockActionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['blockAction'],
      },
    },
    options: [
      {
        name: 'PUT confirm Block',
        value: 'PUT confirm Block',
        description: 'Endpoint: /booking/v1/block-actions/{id}/confirm confirm Block reservation',
        action: 'PUT confirm Block',
      },
      {
        name: 'PUT release block',
        value: 'PUT release block',
        description: 'Endpoint: /booking/v1/block-actions/{id}/release release block reservation',
        action: 'PUT release block',
      },
      {
        name: 'PUT cancel block',
        value: 'PUT cancel block',
        description: 'Endpoint: /booking/v1/block-actions/{id}/cancel Cancel a block',
        action: 'PUT cancel block',
      },
      {
        name: 'PUT wash block',
        value: 'PUT wash block',
        description: 'Endpoint: /booking/v1/block-actions/{id}/wash Wash a block',
        action: 'PUT wash block',
      },
      {
        name: 'PUT amend block',
        value: 'PUT amend block',
        description: 'Endpoint: /booking/v1/block-actions/{id}/amend Modify an existing block',
        action: 'PUT amend block',
      },
    ],
    default: 'PUT confirm Block',
    required: true,
  },
  {
    displayName: 'Block ID',
    name: 'blockId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the block to perform the action on',
    displayOptions: {
      show: {
        resource: ['blockAction'],
        operation: ['PUT confirm Block', 'PUT release block', 'PUT cancel block', 'PUT wash block', 'PUT amend block'],
      },
    },
  },
  {
    displayName: 'Reason',
    name: 'reason',
    type: 'string',
    required: true,
    default: '',
    description: 'The reason for canceling the block',
    displayOptions: {
      show: {
        resource: ['blockAction'],
        operation: ['PUT cancel block'],
      },
    },
  },
  {
    displayName: 'Block Data',
    name: 'blockData',
    type: 'json',
    required: true,
    default: '{}',
    description: 'The data to update the block with',
    displayOptions: {
      show: {
        resource: ['blockAction'],
        operation: ['PUT amend block'],
      },
    },
  },
];
