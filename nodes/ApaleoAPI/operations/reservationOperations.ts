import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { parseISO, isValid } from 'date-fns';

// Helper function to validate ISO 8601 format using date-fns
function validateIso8601Format(date: string): boolean {
  const parsedDate = parseISO(date);
  return isValid(parsedDate);  // Returns true if the date is valid
}

export async function reservationOperations(
  node: IExecuteFunctions,
  itemIndex: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[]
) {
  if (operation === 'get_reservation_by_id') {
    const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;
    const expandReservation = node.getNodeParameter('expandReservation', itemIndex, []) as string[];

    const query = expandReservation.length ? { expand: expandReservation.join(',') } : {};
    const options = {
      method: 'GET' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      qs: query,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response });
    } catch (error) {
      throw new Error(`Apaleo GET reservation failed: ${error.message}`);
    }
  } else if (operation === 'patch_reservation_by_id') {
    const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;
    const patchOperations = node.getNodeParameter('patchOperationsReservation', itemIndex) as string;
    let parsedPatchOperations;

    try {
      parsedPatchOperations = JSON.parse(patchOperations);
    } catch (error) {
      throw new Error(`Invalid JSON in patch operations: ${error.message}`);
    }

    const options = {
      method: 'PATCH' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: parsedPatchOperations,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response || { message: 'Reservation patched successfully' } });
    } catch (error) {
      throw new Error(`Apaleo PATCH reservation failed: ${error.message}`);
    }
  } else if (operation === 'get_reservations') {
    // Get parameters from the node
    const balanceFilter = node.getNodeParameter('balanceFilter', itemIndex, []) as string[];
    const allFoliosHaveInvoice = node.getNodeParameter('allFoliosHaveInvoice', itemIndex, false) as boolean;
    const pageNumber = node.getNodeParameter('pageNumber', itemIndex, 1) as number;
    const pageSize = node.getNodeParameter('pageSize', itemIndex, 100) as number;
    const sort = node.getNodeParameter('sort', itemIndex, []) as string[];
    const expand = node.getNodeParameter('expand', itemIndex, []) as string[];

    const bookingId = node.getNodeParameter('bookingId', itemIndex, '') as string;
    const propertyIds = node.getNodeParameter('propertyIds', itemIndex, []) as string[];
    const ratePlanIds = node.getNodeParameter('ratePlanIds', itemIndex, []) as string[];
    const companyIds = node.getNodeParameter('companyIds', itemIndex, []) as string[];
    const unitIds = node.getNodeParameter('unitIds', itemIndex, []) as string[];
    const unitGroupIds = node.getNodeParameter('unitGroupIds', itemIndex, []) as string[];
    const unitGroupTypes = node.getNodeParameter('unitGroupTypes', itemIndex, []) as string[];
    const blockIds = node.getNodeParameter('blockIds', itemIndex, []) as string[];
    const marketSegmentIds = node.getNodeParameter('marketSegmentIds', itemIndex, []) as string[];
    const status = node.getNodeParameter('status', itemIndex, []) as string[];
    const dateFilter = node.getNodeParameter('dateFilter', itemIndex, '') as string;
    const from = node.getNodeParameter('from', itemIndex, '') as string;
    const to = node.getNodeParameter('to', itemIndex, '') as string;
    const channelCode = node.getNodeParameter('channelCode', itemIndex, []) as string[];
    const sources = node.getNodeParameter('sources', itemIndex, []) as string[];
    const validationMessageCategory = node.getNodeParameter('validationMessageCategory', itemIndex, []) as string[];
    const externalCode = node.getNodeParameter('externalCode', itemIndex, '') as string;
    const textSearch = node.getNodeParameter('textSearch', itemIndex, '') as string;

    // Validate 'from' and 'to' dates using date-fns
    if (from && !validateIso8601Format(from)) {
      throw new Error(`Invalid 'from' date format. Please use ISO 8601 format.`);
    }

    if (to && !validateIso8601Format(to)) {
      throw new Error(`Invalid 'to' date format. Please use ISO 8601 format.`);
    }

    // Additional check: Ensure 'from' is earlier than 'to'
    if (from && to && new Date(from) >= new Date(to)) {
      throw new Error(`'from' date must be earlier than 'to' date.`);
    }

    // Construct the query object dynamically
    const query: Record<string, any> = {
      bookingId: bookingId || undefined,
      propertyIds: propertyIds.length ? propertyIds : undefined,
      ratePlanIds: ratePlanIds.length ? ratePlanIds : undefined,
      companyIds: companyIds.length ? companyIds : undefined,
      unitIds: unitIds.length ? unitIds : undefined,
      unitGroupIds: unitGroupIds.length ? unitGroupIds : undefined,
      unitGroupTypes: unitGroupTypes.length ? unitGroupTypes : undefined,
      blockIds: blockIds.length ? blockIds : undefined,
      marketSegmentIds: marketSegmentIds.length ? marketSegmentIds : undefined,
      status: status.length ? status : undefined,
      dateFilter: dateFilter || undefined,
      from: from || undefined,
      to: to || undefined,
      channelCode: channelCode.length ? channelCode : undefined,
      sources: sources.length ? sources : undefined,
      validationMessageCategory: validationMessageCategory.length ? validationMessageCategory : undefined,
      externalCode: externalCode || undefined,
      textSearch: textSearch || undefined,
      balanceFilter: balanceFilter.length ? balanceFilter : undefined,
      allFoliosHaveInvoice: allFoliosHaveInvoice !== undefined ? allFoliosHaveInvoice : undefined,
      pageNumber: pageNumber > 0 ? pageNumber : undefined,
      pageSize: pageSize > 0 ? pageSize : undefined,
      sort: sort.length ? sort.join(',') : undefined,
      expand: expand.length ? expand.join(',') : undefined,
    };

    // Remove any undefined or empty parameters from the query object
    Object.keys(query).forEach(key => query[key] === undefined || (Array.isArray(query[key]) && query[key].length === 0) && delete query[key]);

    const options = {
      method: 'GET' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/reservations`,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      qs: query,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      if (!response || !response.reservations) {
				throw new Error(`Unexpected API response structure: ${JSON.stringify(response)}`);
			}

			returnData.push(...response.reservations.map((item: any) => ({ json: item })));
    } catch (error) {
      throw new Error(`Apaleo GET reservations failed: ${error.message}`);
    }
  }
}
