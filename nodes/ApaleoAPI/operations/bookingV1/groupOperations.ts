import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function groupOperations(
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
    case 'GET groups':
      endpoint = '/booking/v1/groups';
      qs = {
        textSearch: this.getNodeParameter('textSearch', index, '') as string,
        propertyIds: this.getNodeParameter('propertyIds', index, []) as string[],
        from: this.getNodeParameter('from', index, '') as string,
        to: this.getNodeParameter('to', index, '') as string,
        pageNumber: this.getNodeParameter('pageNumber', index, 1) as number,
        pageSize: this.getNodeParameter('pageSize', index, undefined) as number,
        expand: this.getNodeParameter('expand', index, []) as string[],
      };
      break;

    case 'GET group':
      const groupId = this.getNodeParameter('groupId', index) as string;
      endpoint = `/booking/v1/groups/${groupId}`;
      qs = {
        expand: this.getNodeParameter('expand', index, []) as string[],
      };
      break;

    case 'CREATE group':
      method = 'POST';
      endpoint = '/booking/v1/groups';
      body = this.getNodeParameter('groupData', index) as object;
      break;

    case 'PATCH group':
      method = 'PATCH';
      const patchGroupId = this.getNodeParameter('groupId', index) as string;
      endpoint = `/booking/v1/groups/${patchGroupId}`;
      body = this.getNodeParameter('operations', index) as object;
      break;

    case 'DELETE group':
      method = 'DELETE';
      const deleteGroupId = this.getNodeParameter('groupId', index) as string;
      endpoint = `/booking/v1/groups/${deleteGroupId}`;
      break;

    case 'COUNT groups':
      endpoint = '/booking/v1/groups/$count';
      qs = {
        textSearch: this.getNodeParameter('textSearch', index, '') as string,
        propertyIds: this.getNodeParameter('propertyIds', index, []) as string[],
        from: this.getNodeParameter('from', index, '') as string,
        to: this.getNodeParameter('to', index, '') as string,
      };
      break;

    case 'CREATE group reservations':
      method = 'POST';
      const reservationsGroupId = this.getNodeParameter('groupId', index) as string;
      endpoint = `/booking/v1/groups/${reservationsGroupId}/reservations`;
      body = this.getNodeParameter('reservationsData', index) as object;
      break;

    default:
      throw new Error(`Operation ${operation} is not supported!`);
  }

  responseData = await apiRequest.call(this, method, endpoint, body, qs);
  returnData.push({ json: responseData });
  return responseData;
}
