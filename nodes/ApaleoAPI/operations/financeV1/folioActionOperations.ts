import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function folioActionOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	returnData: INodeExecutionData[],
) {
	let endpoint = '';
	let method: IHttpRequestMethods = 'GET';
	let body: Record<string, any> = {};
	let responseData;

	switch (operation) {
		case 'PUT move multiple charges': {
			method = 'PUT';
			const folioId = this.getNodeParameter('folioId', index) as string;
			endpoint = `/finance/v0-nsfw/folio-actions/${folioId}/move-charges`;

			const targetFolioId = this.getNodeParameter('targetFolioId', index) as string;
			const reason = this.getNodeParameter('reason', index) as string;
			const chargeIds = this.getNodeParameter('chargeIds', index) as string;
			const allowanceIds = this.getNodeParameter('allowanceIds', index) as string;
			const transitoryChargeIds = this.getNodeParameter('transitoryChargeIds', index) as string;

			body.targetFolioId = targetFolioId;
			if (reason) body.reason = reason;
			if (chargeIds) body.chargeIds = chargeIds.split(',').map((id: string) => id.trim());
			else body.chargeIds = [];
			if (allowanceIds) body.allowanceIds = allowanceIds.split(',').map((id: string) => id.trim());
			else body.allowanceIds = [];
			if (transitoryChargeIds)
				body.transitoryChargeIds = transitoryChargeIds.split(',').map((id: string) => id.trim());
			else body.transitoryChargeIds = [];

			break;
		}
		default:
			throw new Error(`The operation "${operation}" is not supported!`);
	}

	// Make the request
	responseData = await apiRequest.call(this, method, endpoint, body);

	// Add the response to the return data
	if (responseData !== undefined) {
		returnData.push({ json: responseData });
	} else {
		// For 204 No Content, push an empty object
		returnData.push({ json: {} });
	}

	return returnData;
}
