import { IExecuteFunctions, IHttpRequestMethods, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function bookingOperations(
  this: IExecuteFunctions,
  itemIndex: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[]
) {
  const index = itemIndex;
  let endpoint = '';
  let method: IHttpRequestMethods = 'GET';
  let body = undefined;
  let qs: Record<string, any> = {};

  switch (operation) {
    case 'POST bookings':
      method = 'POST';
      endpoint = '/booking/v1/bookings';
      body = this.getNodeParameter('bookingDetails', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    case 'POST bookings force':
      method = 'POST';
      endpoint = '/booking/v1/bookings/$force';
      body = this.getNodeParameter('bookingDetails', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    case 'GET bookings':
      endpoint = '/booking/v1/bookings';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        reservationId?: string;
        groupId?: string;
        channelCode?: string[];
        externalCode?: string;
        textSearch?: string;
        pageNumber?: number;
        pageSize?: number;
        expand?: string[];
      };

      if (additionalFields.reservationId) {
        qs.reservationId = additionalFields.reservationId;
      }
      if (additionalFields.groupId) {
        qs.groupId = additionalFields.groupId;
      }
      if (additionalFields.channelCode?.length) {
        qs.channelCode = additionalFields.channelCode;
      }
      if (additionalFields.externalCode) {
        qs.externalCode = additionalFields.externalCode;
      }
      if (additionalFields.textSearch) {
        qs.textSearch = additionalFields.textSearch;
      }
      if (additionalFields.pageNumber) {
        qs.pageNumber = additionalFields.pageNumber;
      }
      if (additionalFields.pageSize) {
        qs.pageSize = additionalFields.pageSize;
      }
      if (additionalFields.expand?.length) {
        qs.expand = additionalFields.expand;
      }
      break;

    case 'GET booking':
      const bookingId = this.getNodeParameter('bookingId', index) as string;
      endpoint = `/booking/v1/bookings/${bookingId}`;
      break;

    case 'POST booking reservations':
      method = 'POST';
      const addBookingId = this.getNodeParameter('bookingId', index) as string;
      endpoint = `/booking/v1/bookings/${addBookingId}/reservations`;
      body = this.getNodeParameter('reservations', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    case 'POST booking reservations force':
      method = 'POST';
      const forceBookingId = this.getNodeParameter('bookingId', index) as string;
      endpoint = `/booking/v1/bookings/${forceBookingId}/reservations/$force`;
      body = this.getNodeParameter('reservations', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    case 'PATCH booking':
      method = 'PATCH';
      const patchBookingId = this.getNodeParameter('bookingId', index) as string;
      endpoint = `/booking/v1/bookings/${patchBookingId}`;
      body = this.getNodeParameter('updateOperations', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    default:
      throw new Error(`Operation "${operation}" is not supported in bookingOperations.`);
  }

  const responseData = await apiRequest.call(
    this,
    method,
    endpoint,
    body,
    qs
  );

  // Add the response data to the returnData array
  returnData.push({ json: responseData });
  
  return responseData;
}
