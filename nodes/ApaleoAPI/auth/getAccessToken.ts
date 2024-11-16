import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';

export async function getAccessToken(node: IExecuteFunctions): Promise<string> {
  const credentials = await node.getCredentials('apaleoApi');
  const { clientId = '', clientSecret = '' } = credentials as { clientId: string; clientSecret: string };

  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret is missing in credentials.');
  }

  const tokenUrl = process.env.APALEO_TOKEN_URL || 'https://identity.apaleo.com/connect/token';

  const bodyParams = new URLSearchParams();
  bodyParams.append('grant_type', 'client_credentials');
  bodyParams.append('client_id', clientId);
  bodyParams.append('client_secret', clientSecret);

  const options = {
    method: 'POST' as IHttpRequestMethods,
    url: tokenUrl,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: bodyParams.toString(),
    json: true,
  };

  try {
    const response = await node.helpers.request(options);
    if (!response.access_token) {
      throw new Error('Access token missing in the response.');
    }
    return response.access_token;
  } catch (error) {
    let errorMessage = `Failed to obtain access token.`;
    if (error.response) {
      errorMessage += ` Status Code: ${error.response.statusCode}. Message: ${error.response.body}`;
    } else {
      errorMessage += ` Message: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}
