import {
  ICredentialType,
  INodeProperties,
  Icon,
} from 'n8n-workflow';

export class ApaleoApi implements ICredentialType {
  name = 'apaleoApi';
  displayName = 'Apaleo API';
  documentationUrl = 'https://api.apaleo.com/swagger/';

  // Adjust the icon path to point to the sibling `logo` folder
  icon: Icon = {
    light: 'file:../nodes/ApaleoAPI/apaleo.svg', // Path for the light theme icon
    dark: 'file:../nodes/ApaleoAPI/apaleo.svg',   // Path for the dark theme icon
  };

  properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      required: true,
      description: 'The client ID for Apaleo API',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The client secret for Apaleo API',
    },
  ];
}
