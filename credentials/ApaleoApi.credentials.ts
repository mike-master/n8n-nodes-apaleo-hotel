import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ApaleoApi implements ICredentialType {
  name = 'apaleoApi';
  displayName = 'Apaleo API';
  properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      default: '',
    },
  ];
}
