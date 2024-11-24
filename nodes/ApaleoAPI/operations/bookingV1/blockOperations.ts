import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function blockOperations(
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
    case 'GET blocks':
      endpoint = '/inventory/v1/blocks';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        propertyIds?: string[];
        from?: string;
        to?: string;
        status?: string[];
        blockType?: string[];
        channelCode?: string[];
        pageNumber?: number;
        pageSize?: number;
        expand?: string[];
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
      if (additionalFields.blockType) {
        qs.blockType = additionalFields.blockType;
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
      break;

    case 'GET block':
      const blockId = this.getNodeParameter('blockId', index) as string;
      endpoint = `/inventory/v1/blocks/${blockId}`;
      method = 'GET';
      break;

    case 'POST block':
      method = 'POST';
      endpoint = '/inventory/v1/blocks';
      body = this.getNodeParameter('blockData', index);
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      break;

    default:
      throw new Error(`Operation "${operation}" is not supported in blockOperations.`);
  }

  responseData = await apiRequest.call(
    this,
    method,
    endpoint,
    body,
    qs
  );

  returnData.push({ json: responseData });
  return responseData;
}
