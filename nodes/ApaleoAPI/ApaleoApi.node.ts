import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData} from 'n8n-workflow';
import { bookingOperations } from './operations/bookingOperations';
import { reservationActionsOperations } from './operations/reservationActionOperations';
import { reservationOperations } from './operations/reservationOperations';
import { getAccessToken } from './auth/getAccessToken';
import { bookingProperties } from './properties/bookingProperties'
import { reservationProperties } from './properties/reservationProperties'
import { reservationActionProperties } from './properties/reservationActionProperties'

export class ApaleoApi implements INodeType {
  description: INodeTypeDescription = {
    // Basic Node Information
    displayName: 'Apaleo',
    name: 'apaleoApi',
    subtitle: '={{$parameter["operation"]}}',
    icon: 'file:apaleo.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with Apaleo API',

    // Node Configuration
    defaults: {
      name: 'Apaleo API',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'apaleoApi', required: true }],

    // Node Properties
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				noDataExpression: true,
				options: [
					{ name: "Booking", value: "booking" },
					{ name: "Reservation", value: "reservation" },
					{ name: "Reservation Action", value: "reservation_action" },
				],
				default: "booking",
				description: "Select the resource to interact with",
			},
			// Include specific properties for each resource
				// === BOOKING OPERATIONS ===
			...bookingProperties,
				// === RESERVATION OPERATIONS ===
			...reservationProperties,
			// === RESERVATION ACTIONS OPERATIONS ===
			...reservationActionProperties,
		],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const accessToken = await getAccessToken(this);

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;

      if (resource === 'booking') {
        await bookingOperations(this, i, operation, accessToken, returnData);
      } else if (resource === 'reservation') {
        await reservationOperations(this, i, operation, accessToken, returnData);
      } else if (resource === 'reservation_action') {
        await reservationActionsOperations(this, i, operation, accessToken, returnData);
      }
    }
    return this.prepareOutputData(returnData);
  }
}
