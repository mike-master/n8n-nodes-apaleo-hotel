import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function bookingOperations(
  node: IExecuteFunctions,
  itemIndex: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[]
) {
  if (operation === 'get_booking_by_id') {
    const bookingId = node.getNodeParameter('bookingId', itemIndex) as string;
    const expandBooking = node.getNodeParameter('expandBooking', itemIndex) as string[];

    const query = expandBooking.length ? { expand: expandBooking.join(',') } : {};
    const options = {
      method: 'GET' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/bookings/${bookingId}`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      qs: query,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response });
    } catch (error) {
      throw new Error(`Apaleo GET booking failed: ${error.message}`);
    }
  } else if (operation === 'create_booking') {
    const reservationsData = node.getNodeParameter('reservationsData', itemIndex) as string;
    let parsedReservationsData;

    try {
      parsedReservationsData = JSON.parse(reservationsData);
    } catch (error) {
      throw new Error(`Invalid JSON in reservations data: ${error.message}`);
    }

    const options = {
      method: 'POST' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/bookings`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: parsedReservationsData,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response });
    } catch (error) {
      throw new Error(`Apaleo POST booking failed: ${error.message}`);
    }
  } else if (operation === 'patch_booking_by_id') {
    const bookingId = node.getNodeParameter('bookingId', itemIndex) as string;
    const patchOperations = node.getNodeParameter('patchOperationsBooking', itemIndex) as string;
    let parsedPatchOperations;

    try {
      parsedPatchOperations = JSON.parse(patchOperations);
    } catch (error) {
      throw new Error(`Invalid JSON in patch operations: ${error.message}`);
    }

    const options = {
      method: 'PATCH' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/bookings/${bookingId}`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: parsedPatchOperations,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response || { message: 'Booking patched successfully' } });
    } catch (error) {
      throw new Error(`Apaleo PATCH booking failed: ${error.message}`);
    }
  } else if (operation === 'get_all_bookings') {
    const reservationId = node.getNodeParameter('reservationId', itemIndex, '') as string;
    const groupId = node.getNodeParameter('groupId', itemIndex, '') as string;
    const channelCode = node.getNodeParameter('channelCode', itemIndex, []) as string[];
    const externalCode = node.getNodeParameter('externalCode', itemIndex, '') as string;
    const textSearch = node.getNodeParameter('textSearch', itemIndex, '') as string;
    const pageNumber = node.getNodeParameter('pageNumber', itemIndex, 1) as number;
    const pageSize = node.getNodeParameter('pageSize', itemIndex, 10) as number;
    const expand = node.getNodeParameter('expand', itemIndex, []) as string[];

    const query: any = {};
    if (reservationId) query.reservationId = reservationId;
    if (groupId) query.groupId = groupId;
    if (channelCode.length > 0) query.channelCode = channelCode.join(',');
    if (externalCode) query.externalCode = externalCode;
    if (textSearch) query.textSearch = textSearch;
    if (pageNumber) query.pageNumber = pageNumber;
    if (pageSize) query.pageSize = pageSize;
    if (expand.length > 0) query.expand = expand.join(',');

    const options = {
      method: 'GET' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/bookings`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      qs: query,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response });
    } catch (error) {
      throw new Error(`Apaleo GET all bookings failed: ${error.message}`);
    }
  }
}
