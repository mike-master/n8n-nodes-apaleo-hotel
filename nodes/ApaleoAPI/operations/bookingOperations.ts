import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function bookingOperations(
  node: IExecuteFunctions,
  itemIndex: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[]
) {
  // Helper function to add non-empty query parameters
  const constructUrlWithParams = (baseUrl: string, params: Record<string, any>): string => {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '' && (!(Array.isArray(value) && value.length === 0)))
      .map(([key, value]) => `${key}=${encodeURIComponent(Array.isArray(value) ? value.join(',') : value)}`)
      .join('&');
    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  };

  if (operation === 'GET booking by ID') {
    const bookingId = node.getNodeParameter('bookingId', itemIndex) as string;
    const expandBooking = node.getNodeParameter('expandBooking', itemIndex) as string[];

    const params = { expand: expandBooking.length > 0 ? expandBooking.join(',') : undefined };
    const url = constructUrlWithParams(`https://api.apaleo.com/booking/v1/bookings/${bookingId}`, params);

    const options = {
      method: 'GET' as IHttpRequestMethods,
      url,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response });
    } catch (error) {
      throw new Error(`Apaleo GET booking failed: ${error.message}`);
    }
  } else if (operation === 'POST bookings') {
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
  } else if (operation === 'PATCH booking by ID') {
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
  } else if (operation === 'GET bookings') {
    const params = {
      reservationId: node.getNodeParameter('reservationId', itemIndex, '') as string,
      groupId: node.getNodeParameter('groupId', itemIndex, '') as string,
      channelCode: node.getNodeParameter('channelCode', itemIndex, []) as string[],
      externalCode: node.getNodeParameter('externalCode', itemIndex, '') as string,
      textSearch: node.getNodeParameter('textSearch', itemIndex, '') as string,
      pageNumber: node.getNodeParameter('pageNumber', itemIndex, 1) as number,
      pageSize: node.getNodeParameter('pageSize', itemIndex, 10) as number,
      expand: node.getNodeParameter('expand', itemIndex, []) as string[],
    };

    const url = constructUrlWithParams(`https://api.apaleo.com/booking/v1/bookings`, params);

    const options = {
      method: 'GET' as IHttpRequestMethods,
      url: url,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
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
