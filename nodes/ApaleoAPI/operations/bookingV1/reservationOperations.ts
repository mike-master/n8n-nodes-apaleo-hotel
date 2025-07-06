import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function reservationOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	accessToken: string,
	returnData: INodeExecutionData[],
) {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body = undefined;
	let qs: Record<string, any> = {};
	let responseData;

	switch (operation) {
		case 'GET reservations':
			endpoint = '/booking/v1/reservations';
			const additionalFields = this.getNodeParameter('additionalFields', index) as {
				propertyIds?: string[];
				from?: string;
				to?: string;
				status?: string[];
				channelCode?: string[];
				pageNumber?: number;
				pageSize?: number;
				expand?: string[];
				dateFilter?: string;
			};

			if (additionalFields.propertyIds) {
				qs.propertyIds = additionalFields.propertyIds;
			}
			if (additionalFields.from) {
				qs.from = additionalFields.from;
			}
			if (additionalFields.to) {
				qs.to = additionalFields.to;
			}
			if (additionalFields.status) {
				qs.status = additionalFields.status;
			}
			if (additionalFields.channelCode) {
				qs.channelCode = additionalFields.channelCode;
			}
			if (additionalFields.pageNumber) {
				qs.pageNumber = additionalFields.pageNumber;
			}
			if (additionalFields.pageSize) {
				qs.pageSize = additionalFields.pageSize;
			}
			if (additionalFields.expand) {
				qs.expand = additionalFields.expand;
			}
			if (additionalFields.dateFilter) {
				qs.dateFilter = additionalFields.dateFilter;
			}
			break;

		case 'GET reservation':
			const reservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${reservationId}`;
			break;

		case 'POST reservation':
			method = 'POST';
			endpoint = '/booking/v1/reservations';
			body = this.getNodeParameter('reservationData', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			break;

		case 'PATCH reservation':
			method = 'PATCH';
			const patchReservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${patchReservationId}`;
			body = this.getNodeParameter('updateOperations', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			break;

		case 'GET reservation by ID':
			const getReservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${getReservationId}`;
			const expandReservation = this.getNodeParameter('expand', index, []) as string[];
			if (expandReservation.length) {
				qs.expand = expandReservation.join(',');
			}
			break;

		case 'PATCH reservation by ID':
			method = 'PATCH';
			const patchReservationByIdId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${patchReservationByIdId}`;
			body = this.getNodeParameter('patchOperationsReservation', index);
			if (typeof body === 'string') {
				body = JSON.parse(body);
			}
			break;

		case 'GET reservations':
			endpoint = '/booking/v1/reservations';
			const params = {
				balanceFilter: this.getNodeParameter('balanceFilter', index, []) as string[],
				allFoliosHaveInvoice: this.getNodeParameter('allFoliosHaveInvoice', index, false),
				sort: this.getNodeParameter('sort', index, []) as string[],
				expand: this.getNodeParameter('expand', index, []) as string[],
				bookingId: this.getNodeParameter('bookingId', index, ''),
				propertyIds: this.getNodeParameter('propertyIds', index, []) as string[],
				ratePlanIds: this.getNodeParameter('ratePlanIds', index, []) as string[],
				companyIds: this.getNodeParameter('companyIds', index, []) as string[],
				unitIds: this.getNodeParameter('unitIds', index, []) as string[],
				unitGroupIds: this.getNodeParameter('unitGroupIds', index, []) as string[],
				unitGroupTypes: this.getNodeParameter('unitGroupTypes', index, []) as string[],
				blockIds: this.getNodeParameter('blockIds', index, []) as string[],
				marketSegmentIds: this.getNodeParameter('marketSegmentIds', index, []) as string[],
				status: this.getNodeParameter('status', index, []) as string[],
				dateFilter: this.getNodeParameter('dateFilter', index, ''),
				from: this.getNodeParameter('from', index, ''),
				to: this.getNodeParameter('to', index, ''),
				channelCode: this.getNodeParameter('channelCode', index, []) as string[],
				sources: this.getNodeParameter('sources', index, []) as string[],
				validationMessageCategory: this.getNodeParameter(
					'validationMessageCategory',
					index,
					[],
				) as string[],
				externalCode: this.getNodeParameter('externalCode', index, ''),
				textSearch: this.getNodeParameter('textSearch', index, ''),
				pageNumber: (this.getNodeParameter('pageNumber', index, 1) as number).toString(),
				pageSize: (this.getNodeParameter('pageSize', index, 100) as number).toString(),
			};

			Object.assign(qs, params);
			break;

		case 'GET reservation count':
			endpoint = '/booking/v1/reservations/$count';
			const countParams = {
				propertyIds: this.getNodeParameter('propertyIds', index, []) as string[],
				ratePlanIds: this.getNodeParameter('ratePlanIds', index, []) as string[],
				companyIds: this.getNodeParameter('companyIds', index, []) as string[],
				unitIds: this.getNodeParameter('unitIds', index, []) as string[],
				unitGroupIds: this.getNodeParameter('unitGroupIds', index, []) as string[],
				unitGroupTypes: this.getNodeParameter('unitGroupTypes', index, []) as string[],
				blockIds: this.getNodeParameter('blockIds', index, []) as string[],
				marketSegmentIds: this.getNodeParameter('marketSegmentIds', index, []) as string[],
				status: this.getNodeParameter('status', index, []) as string[],
				dateFilter: this.getNodeParameter('dateFilter', index, ''),
				from: this.getNodeParameter('from', index, ''),
				to: this.getNodeParameter('to', index, ''),
				channelCode: this.getNodeParameter('channelCode', index, []) as string[],
				sources: this.getNodeParameter('sources', index, []) as string[],
				externalCode: this.getNodeParameter('externalCode', index, ''),
				textSearch: this.getNodeParameter('textSearch', index, ''),
			};

			Object.assign(qs, countParams);
			break;

		case 'GET reservation offers':
			const offersReservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${offersReservationId}/offers`;
			break;

		case 'GET reservation service offers':
			const serviceOffersReservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${serviceOffersReservationId}/service-offers`;
			break;

		case 'GET reservation services':
			const servicesReservationId = this.getNodeParameter('reservationId', index) as string;
			endpoint = `/booking/v1/reservations/${servicesReservationId}/services`;
			break;

		case 'DELETE reservation service':
			method = 'DELETE';
			const deleteServiceReservationId = this.getNodeParameter('reservationId', index) as string;
			const serviceId = this.getNodeParameter('serviceId', index) as string;
			endpoint = `/booking/v1/reservations/${deleteServiceReservationId}/services`;
			qs.serviceId = serviceId;
			break;

		default:
			throw new Error(`Operation "${operation}" is not supported in reservationOperations.`);
	}

	responseData = await apiRequest.call(this, method as IHttpRequestMethods, endpoint, body, qs);

	returnData.push({ json: responseData });
	return responseData;
}
