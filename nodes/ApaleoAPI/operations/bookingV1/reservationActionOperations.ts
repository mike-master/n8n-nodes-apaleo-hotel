import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function reservationActionOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	accessToken: string,
	returnData: INodeExecutionData[],
) {
	let endpoint = '';
	let method: IHttpRequestMethods = 'POST';
	let body = undefined;
	let qs: Record<string, any> = {};
	let responseData;

	const reservationId = this.getNodeParameter('reservationId', index) as string;

	switch (operation) {
		case 'assign unit':
			endpoint = `/booking/v1/reservations/${reservationId}/assign-unit`;
			body = {
				unitId: this.getNodeParameter('unitId', index),
			};
			break;

		case 'check in':
			endpoint = `/booking/v1/reservations/${reservationId}/check-in`;
			break;

		case 'check out':
			endpoint = `/booking/v1/reservations/${reservationId}/check-out`;
			break;

		case 'cancel':
			endpoint = `/booking/v1/reservations/${reservationId}/cancel`;
			body = {
				reason: this.getNodeParameter('reason', index),
			};
			break;

		case 'no show':
			endpoint = `/booking/v1/reservations/${reservationId}/no-show`;
			break;

		case 'PUT checkin reservation': {
			// Endpoint: /booking/v1/reservation-actions/{id}/checkin
			endpoint = `/booking/v1/reservation-actions/${reservationId}/checkin`;
			method = 'PUT';
			break;
		}

		case 'PUT mark reservation as no-show': {
			// Endpoint: /booking/v1/reservation-actions/{id}/noshow
			endpoint = `/booking/v1/reservation-actions/${reservationId}/noshow`;
			method = 'PUT';
			break;
		}

		case 'amend':
			endpoint = `/booking/v1/reservations/${reservationId}`;
			method = 'PATCH' as IHttpRequestMethods;
			body = this.getNodeParameter('amendData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			break;

		default:
			throw new Error(`Operation "${operation}" is not supported in reservationActionsOperations.`);
	}

	responseData = await apiRequest.call(this, method, endpoint, body, qs);

	returnData.push({ json: responseData });
	return responseData;
}
