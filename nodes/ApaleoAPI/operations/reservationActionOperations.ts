import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function reservationActionsOperations(
  node: IExecuteFunctions,
  itemIndex: number,
  operation: string,
  accessToken: string,
  returnData: INodeExecutionData[]
) {
  if (operation === 'PUT assign unit to reservation') {
    const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;
    const unitConditions = node.getNodeParameter('unitConditions', itemIndex, []) as string[];

    // Validieren der Parameter
    if (!reservationId) {
      throw new Error('The reservation ID is required.');
    }

    const query: Record<string, any> = {
      unitConditions: unitConditions.length ? unitConditions.join(',') : undefined,
    };

    // Entfernen von undefined-Werten
    Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

    const options = {
      method: 'PUT' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/reservation-actions/${reservationId}/assign-unit`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      qs: query,
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response || { message: 'Unit assigned successfully' } });
    } catch (error) {
      throw new Error(`Apaleo assign unit failed: ${error.message}`);
    }
  } else if (operation === 'PUT unassign unit from reservation') {
    const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;

    // Validieren der Parameter
    if (!reservationId) {
      throw new Error('The reservation ID is required.');
    }

    const options = {
      method: 'PUT' as IHttpRequestMethods,
      url: `https://api.apaleo.com/booking/v1/reservation-actions/${reservationId}/unassign-units`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      json: true,
    };

    try {
      const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
      returnData.push({ json: response || { message: 'Unit unassigned successfully' } });
    } catch (error) {
      throw new Error(`Apaleo unassign unit failed: ${error.message}`);
    }
  } else {
    throw new Error(`Operation "${operation}" is not supported in reservationActions.`);
  }
}
