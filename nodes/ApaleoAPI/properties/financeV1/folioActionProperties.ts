import { INodeProperties } from 'n8n-workflow';

export const folioActionProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['folioAction'],
			},
		},
		options: [
			{
				name: 'PUT move multiple charges',
				value: 'PUT move multiple charges',
				description:
					'Endpoint: /finance/v1/folio-actions/{folioId}/move-charges Move multiple charges, allowances and transitory charges from one folio to another',
				action: 'PUT move multiple charges',
			},
			{
				name: 'POST add no-show fee',
				value: 'POST add no-show fee',
				description:
					'Endpoint: /finance/v1/folio-actions/{folioId}/no-show-fee Adds and directly posts a no-show fee to the folio',
				action: 'POST add no-show fee',
			},
		],
		default: 'PUT move multiple charges',
		noDataExpression: true,
		required: true,
	},
	{
		displayName: 'Folio ID',
		name: 'folioId',
		type: 'string',
		default: '',
		description: 'The folio ID',
		required: true,
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges', 'POST add no-show fee'],
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		default: 0,
		description: 'The amount of the no-show fee',
		required: true,
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['POST add no-show fee'],
			},
		},
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: '',
		description: 'The currency of the no-show fee',
		required: true,
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['POST add no-show fee'],
			},
		},
	},
	{
		displayName: 'Idempotency Key',
		name: 'idempotencyKey',
		type: 'string',
		default: '',
		description: 'Unique key for safely retrying requests (optional)',
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['POST add no-show fee'],
			},
		},
	},
	{
		displayName: 'Target Folio ID',
		name: 'targetFolioId',
		type: 'string',
		default: '',
		description: 'The ID of the target folio to move the charges to.',
		required: true,
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges'],
			},
		},
	},
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'string',
		default: '',
		description: 'Reason for moving the charges (optional).',
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges'],
			},
		},
	},
	{
		displayName: 'Charge IDs',
		name: 'chargeIds',
		type: 'string',
		default: '',
		placeholder: 'Comma-separated list of charge IDs',
		description: 'IDs of the charges to move (comma-separated).',
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges'],
			},
		},
	},
	{
		displayName: 'Allowance IDs',
		name: 'allowanceIds',
		type: 'string',
		default: '',
		placeholder: 'Comma-separated list of allowance IDs',
		description: 'IDs of the allowances to move (comma-separated).',
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges'],
			},
		},
	},
	{
		displayName: 'Transitory Charge IDs',
		name: 'transitoryChargeIds',
		type: 'string',
		default: '',
		placeholder: 'Comma-separated list of transitory charge IDs',
		description: 'IDs of the transitory charges to move (comma-separated).',
		displayOptions: {
			show: {
				resource: ['folioAction'],
				operation: ['PUT move multiple charges'],
			},
		},
	},
];
