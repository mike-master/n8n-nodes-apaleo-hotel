import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function typesOperations(
  this: IExecuteFunctions,
  index: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[],
) {
  let responseData;

  if (operation === 'GET sources') {
    responseData = await apiRequest.call(this, 'GET', '/booking/v1/types/sources');
  } else if (operation === 'GET allowed values') {
    const type = this.getNodeParameter('type', index) as string;
    const countryCode = this.getNodeParameter('countryCode', index) as string;
    const additionalFields = this.getNodeParameter('additionalFields', index) as {
      textSearch?: string;
      pageNumber?: number;
      pageSize?: number;
      sort?: string[];
    };

    const qs: {
      countryCode: string;
      textSearch?: string;
      pageNumber?: number;
      pageSize?: number;
      sort?: string[];
    } = {
      countryCode,
    };

    if (additionalFields.textSearch) {
      qs.textSearch = additionalFields.textSearch;
    }
    if (additionalFields.pageNumber) {
      qs.pageNumber = additionalFields.pageNumber;
    }
    if (additionalFields.pageSize) {
      qs.pageSize = additionalFields.pageSize;
    }
    if (additionalFields.sort) {
      qs.sort = additionalFields.sort;
    }

    responseData = await apiRequest.call(
      this,
      'GET',
      `/booking/v1/types/${type}/allowed-values`,
      {},
      qs,
    );
  }

  if (Array.isArray(responseData)) {
    returnData.push.apply(returnData, responseData);
  } else if (responseData !== undefined) {
    returnData.push(responseData as INodeExecutionData);
  }
  return returnData;
}
