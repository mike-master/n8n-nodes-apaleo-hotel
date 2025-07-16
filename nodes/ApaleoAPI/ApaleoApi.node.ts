import { IExecuteFunctions } from 'n8n-workflow';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

// Booking API Operations
import { blockOperations } from './operations/bookingV1/blockOperations';
import { blockActionOperations } from './operations/bookingV1/blockActionOperations';
import { bookingOperations } from './operations/bookingV1/bookingOperations';
import { groupOperations } from './operations/bookingV1/groupOperations';
import { offerOperations } from './operations/bookingV1/offerOperations';
import { reservationOperations } from './operations/bookingV1/reservationOperations';
import { reservationActionOperations } from './operations/bookingV1/reservationActionOperations';
import { typesOperations } from './operations/bookingV1/typesOperations';

// Finance API Operations
import { folioOperations } from './operations/financeV1/folioOperations';
import { folioActionOperations } from './operations/financeV1/folioActionOperations';

// Booking API Properties
import { blockProperties } from './properties/bookingV1/blockProperties';
import { blockActionProperties } from './properties/bookingV1/blockActionProperties';
import { bookingProperties } from './properties/bookingV1/bookingProperties';
import { groupProperties } from './properties/bookingV1/groupProperties';
import { offerProperties } from './properties/bookingV1/offerProperties';
import { reservationProperties } from './properties/bookingV1/reservationProperties';
import { reservationActionProperties } from './properties/bookingV1/reservationActionProperties';
import { typesProperties } from './properties/bookingV1/typesProperties';

// Finance API Properties
import { folioProperties } from './properties/financeV1/folioProperties';

class ApaleoApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Apaleo',
		name: 'apaleoApi',
		icon: 'file:apaleo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Apaleo API',
		defaults: {
			name: 'Apaleo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'apaleoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.apaleo.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				default: 'booking',
				options: [
					// Booking API Resources
					{
						name: 'Block',
						value: 'block',
					},
					{
						name: 'Block Action',
						value: 'blockAction',
					},
					{
						name: 'Booking',
						value: 'booking',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Offer',
						value: 'offer',
					},
					{
						name: 'Reservation',
						value: 'reservation',
					},
					{
						name: 'Reservation Action',
						value: 'reservationAction',
					},
					{
						name: 'Types',
						value: 'types',
					},
					// Finance API Resources
					{
						name: 'Folio',
						value: 'folio',
					},
					{
						name: 'Folio Action',
						value: 'folioAction',
					},
				],
				required: true,
				description: 'Select the resource to interact with',
			},
			// Booking API Properties
			...blockProperties,
			...blockActionProperties,
			...bookingProperties,
			...groupProperties,
			...offerProperties,
			...reservationProperties,
			...reservationActionProperties,
			...typesProperties,
			// Finance API Properties
			...folioProperties,
			...require('./properties/financeV1/folioActionProperties').folioActionProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('apaleoApi');
		const accessToken = credentials.accessToken as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'block') {
					await blockOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'blockAction') {
					await blockActionOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'booking') {
					await bookingOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'folio') {
					await folioOperations.call(this, i, operation, returnData);
				}
				if (resource === 'folioAction') {
					await folioActionOperations.call(this, i, operation, returnData);
				}
				if (resource === 'group') {
					await groupOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'offer') {
					await offerOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'reservation') {
					await reservationOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'reservationAction') {
					await reservationActionOperations.call(this, i, operation, accessToken, returnData);
				}
				if (resource === 'types') {
					await typesOperations.call(this, i, operation, accessToken, returnData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message, json: {} });
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}

module.exports = { ApaleoApi };
