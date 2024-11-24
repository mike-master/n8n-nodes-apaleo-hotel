import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function blockActionOperations(
  this: IExecuteFunctions,
  index: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[],
) {
  const blockId = this.getNodeParameter('blockId', index) as string;
  let responseData;

  if (operation === 'confirmBlock') {
    responseData = await apiRequest.call(this, 'POST', `/inventory/v1/blocks/${blockId}/confirm`);
  } else if (operation === 'releaseBlock') {
    responseData = await apiRequest.call(this, 'POST', `/inventory/v1/blocks/${blockId}/release`);
  } else if (operation === 'cancelBlock') {
    const reason = this.getNodeParameter('reason', index) as string;
    responseData = await apiRequest.call(this, 'POST', `/inventory/v1/blocks/${blockId}/cancel`, { reason });
  } else if (operation === 'washBlock') {
    responseData = await apiRequest.call(this, 'POST', `/inventory/v1/blocks/${blockId}/wash`);
  } else if (operation === 'amendBlock') {
    const body = this.getNodeParameter('blockData', index) as object;
    responseData = await apiRequest.call(this, 'PATCH', `/inventory/v1/blocks/${blockId}`, body);
  } else {
    throw new Error(`Operation ${operation} is not supported!`);
  }

  returnData.push({ json: responseData });
  return responseData;
}
