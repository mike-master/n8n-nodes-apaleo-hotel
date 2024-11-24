import { IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';
import { getAccessToken } from './auth/getAccessToken';

export async function apiRequest(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?: any,
  qs?: Record<string, any>,
) {
  const accessToken = await getAccessToken(this);
  
  const options: Record<string, any> = {
    method,
    url: 'https://api.apaleo.com' + endpoint,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    json: true,
  };

  if (body !== undefined) {
    options.body = body;
  }

  if (qs !== undefined) {
    options.qs = qs;
  }

  // Add idempotency key for POST requests
  if (method === 'POST') {
    options.headers['Idempotency-Key'] = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  }

  try {
    const response = await this.helpers.request(options);
    return response;
  } catch (error) {
    if (error.statusCode === 404) {
      return undefined;
    }
    throw error;
  }
}
