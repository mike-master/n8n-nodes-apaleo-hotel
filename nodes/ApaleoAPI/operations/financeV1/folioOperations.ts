import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function folioOperations(
  this: IExecuteFunctions,
  index: number,
  operation: string,
  returnData: INodeExecutionData[],
) {
  let endpoint = '';
  let method: IHttpRequestMethods = 'GET';
  let body = undefined;
  let qs: Record<string, any> = {};
  let responseData;

  switch (operation) {
    case 'GET folios':
      method = 'GET';
      endpoint = '/finance/v1/folios';
      
      // Add query parameters
      const propertyIds = this.getNodeParameter('propertyIds', index) as string;
      if (propertyIds) qs.propertyIds = propertyIds.split(',');
      
      const companyIds = this.getNodeParameter('companyIds', index) as string;
      if (companyIds) qs.companyIds = companyIds.split(',');
      
      const reservationIds = this.getNodeParameter('reservationIds', index) as string;
      if (reservationIds) qs.reservationIds = reservationIds.split(',');
      
      const bookingIds = this.getNodeParameter('bookingIds', index) as string;
      if (bookingIds) qs.bookingIds = bookingIds.split(',');
      
      qs.isEmpty = this.getNodeParameter('isEmpty', index) as boolean;
      qs.checkedOutOnAccountsReceivable = this.getNodeParameter('checkedOutOnAccountsReceivable', index) as boolean;
      qs.excludeClosed = this.getNodeParameter('excludeClosed', index) as boolean;
      qs.hasInvoices = this.getNodeParameter('hasInvoices', index) as boolean;
      
      const createdFrom = this.getNodeParameter('createdFrom', index) as string;
      if (createdFrom) qs.createdFrom = createdFrom;
      
      const createdTo = this.getNodeParameter('createdTo', index) as string;
      if (createdTo) qs.createdTo = createdTo;
      
      const updatedFrom = this.getNodeParameter('updatedFrom', index) as string;
      if (updatedFrom) qs.updatedFrom = updatedFrom;
      
      const updatedTo = this.getNodeParameter('updatedTo', index) as string;
      if (updatedTo) qs.updatedTo = updatedTo;
      
      qs.onlyMain = this.getNodeParameter('onlyMain', index) as boolean;
      
      const type = this.getNodeParameter('type', index) as string;
      if (type) qs.type = type;
      
      const externalFolioCode = this.getNodeParameter('externalFolioCode', index) as string;
      if (externalFolioCode) qs.externalFolioCode = externalFolioCode;
      
      const textSearch = this.getNodeParameter('textSearch', index) as string;
      if (textSearch) qs.textSearch = textSearch;
      
      const balanceFilter = this.getNodeParameter('balanceFilter', index) as string;
      if (balanceFilter) qs.balanceFilter = balanceFilter.split(',');
      
      qs.pageNumber = this.getNodeParameter('pageNumber', index) as number;
      qs.pageSize = this.getNodeParameter('pageSize', index) as number;
      break;

    case 'GET folio':
      method = 'GET';
      const getFolioId = this.getNodeParameter('id', index) as string;
      endpoint = `/finance/v1/folios/${getFolioId}`;
      break;

    case 'GET count folios':
      method = 'GET';
      endpoint = '/finance/v1/folios/$count';
      
      // Add query parameters (same as GET folios)
      const countPropertyIds = this.getNodeParameter('propertyIds', index) as string;
      if (countPropertyIds) qs.propertyIds = countPropertyIds.split(',');
      
      const countCompanyIds = this.getNodeParameter('companyIds', index) as string;
      if (countCompanyIds) qs.companyIds = countCompanyIds.split(',');
      
      const countReservationIds = this.getNodeParameter('reservationIds', index) as string;
      if (countReservationIds) qs.reservationIds = countReservationIds.split(',');
      
      const countBookingIds = this.getNodeParameter('bookingIds', index) as string;
      if (countBookingIds) qs.bookingIds = countBookingIds.split(',');
      
      qs.isEmpty = this.getNodeParameter('isEmpty', index) as boolean;
      qs.checkedOutOnAccountsReceivable = this.getNodeParameter('checkedOutOnAccountsReceivable', index) as boolean;
      qs.excludeClosed = this.getNodeParameter('excludeClosed', index) as boolean;
      qs.hasInvoices = this.getNodeParameter('hasInvoices', index) as boolean;
      
      const countCreatedFrom = this.getNodeParameter('createdFrom', index) as string;
      if (countCreatedFrom) qs.createdFrom = countCreatedFrom;
      
      const countCreatedTo = this.getNodeParameter('createdTo', index) as string;
      if (countCreatedTo) qs.createdTo = countCreatedTo;
      
      const countUpdatedFrom = this.getNodeParameter('updatedFrom', index) as string;
      if (countUpdatedFrom) qs.updatedFrom = countUpdatedFrom;
      
      const countUpdatedTo = this.getNodeParameter('updatedTo', index) as string;
      if (countUpdatedTo) qs.updatedTo = countUpdatedTo;
      
      qs.onlyMain = this.getNodeParameter('onlyMain', index) as boolean;
      
      const countType = this.getNodeParameter('type', index) as string;
      if (countType) qs.type = countType;
      
      const countExternalFolioCode = this.getNodeParameter('externalFolioCode', index) as string;
      if (countExternalFolioCode) qs.externalFolioCode = countExternalFolioCode;
      
      const countTextSearch = this.getNodeParameter('textSearch', index) as string;
      if (countTextSearch) qs.textSearch = countTextSearch;
      
      const countBalanceFilter = this.getNodeParameter('balanceFilter', index) as string;
      if (countBalanceFilter) qs.balanceFilter = countBalanceFilter.split(',');
      break;

    case 'POST folio':
      method = 'POST';
      endpoint = '/finance/v1/folios';
      body = this.getNodeParameter('data', index);
      break;

    case 'PATCH folio':
      method = 'PATCH';
      const patchFolioId = this.getNodeParameter('id', index) as string;
      endpoint = `/finance/v1/folios/${patchFolioId}`;
      body = this.getNodeParameter('updateOperations', index);
      break;

    case 'HEAD folio exists':
      method = 'HEAD';
      const headFolioId = this.getNodeParameter('id', index) as string;
      endpoint = `/finance/v1/folios/${headFolioId}`;
      break;

    case 'DELETE folio':
      method = 'DELETE';
      const deleteFolioId = this.getNodeParameter('id', index) as string;
      endpoint = `/finance/v1/folios/${deleteFolioId}`;
      break;

    default:
      throw new Error(`The operation "${operation}" is not supported!`);
  }

  // Make the request
  responseData = await apiRequest.call(this, method, endpoint, body, qs);

  // Add the response to the return data
  if (responseData !== undefined) {
    returnData.push({ json: responseData });
  }

  return returnData;
}
