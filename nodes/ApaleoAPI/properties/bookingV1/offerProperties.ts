import { INodeProperties } from 'n8n-workflow';

export const offerProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['offer'],
      },
    },
    options: [
      {
        name: 'GET offers',
        value: 'GET offers',
        description: 'Endpoint: /booking/v1/offers Returns offers for one specific stay',
        action: 'GET offers',
      },
      {
        name: 'GET rate-plan-offers',
        value: 'GET rate-plan-offers',
        description: 'Endpoint: /booking/v1/rate-plan-offers Returns offers for a specific rate plan',
        action: 'GET rate-plan-offers',
      },
      {
        name: 'GET service-offers',
        value: 'GET service-offers',
        description: 'Endpoint: /booking/v1/service-offers Returns service offers for one specific stay',
        action: 'GET service-offers',
      },
      {
        name: 'GET offer-index',
        value: 'GET offer-index',
        description: 'Endpoint: /booking/v1/offer-index Returns offers with rates and availabilities',
        action: 'GET offer-index',
      },
    ],
    default: 'GET offers',
  },
  // Properties for GET offers
  {
    displayName: 'Property ID',
    name: 'propertyId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers'],
      },
    },
    description: 'The property ID',
  },
  {
    displayName: 'Arrival',
    name: 'arrival',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers', 'GET rate-plan-offers', 'GET service-offers'],
      },
    },
    description: 'Date and optional time of arrival (ISO8601 format)',
  },
  {
    displayName: 'Departure',
    name: 'departure',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers', 'GET rate-plan-offers', 'GET service-offers'],
      },
    },
    description: 'Date and optional time of departure (ISO8601 format)',
  },
  {
    displayName: 'Adults',
    name: 'adults',
    type: 'number',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers', 'GET rate-plan-offers', 'GET service-offers'],
      },
    },
    description: 'The number of adults',
  },
  {
    displayName: 'Channel Code',
    name: 'channelCode',
    type: 'options',
    required: false,
    default: 'Direct',
    options: [
      { name: 'Direct', value: 'Direct' },
      { name: 'Booking.com', value: 'BookingCom' },
      { name: 'IBE', value: 'Ibe' },
      { name: 'Channel Manager', value: 'ChannelManager' },
      { name: 'Expedia', value: 'Expedia' },
      { name: 'Homelike', value: 'Homelike' },
      { name: 'HRS', value: 'Hrs' },
      { name: 'AltoVita', value: 'AltoVita' },
      { name: 'DesVu', value: 'DesVu' },
    ],
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers', 'GET rate-plan-offers', 'GET service-offers', 'GET offer-index'],
      },
    },
    description: 'The channel code',
  },
  // Additional properties for GET rate-plan-offers and GET service-offers
  {
    displayName: 'Rate Plan ID',
    name: 'ratePlanId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET rate-plan-offers', 'GET service-offers', 'GET offer-index'],
      },
    },
    description: 'The rate plan ID',
  },
  // Properties for GET offer-index
  {
    displayName: 'From',
    name: 'from',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offer-index'],
      },
    },
    description: 'Start date (ISO8601 format)',
  },
  {
    displayName: 'To',
    name: 'to',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offer-index'],
      },
    },
    description: 'End date (ISO8601 format)',
  },
  // Optional properties
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['offer'],
        operation: ['GET offers', 'GET rate-plan-offers', 'GET service-offers', 'GET offer-index'],
      },
    },
    options: [
      {
        displayName: 'Children Ages',
        name: 'childrenAges',
        type: 'string',
        default: '',
        description: 'Comma-separated list of children ages',
      },
      {
        displayName: 'Include Unavailable',
        name: 'includeUnavailable',
        type: 'boolean',
        default: false,
        description: 'Whether to include unavailable offers',
      },
      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Page number for paginated results',
      },
      {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        default: 100,
        description: 'Number of items per page',
      },
      {
        displayName: 'Time Slice Template',
        name: 'timeSliceTemplate',
        type: 'options',
        options: [
          { name: 'Day Use', value: 'DayUse' },
          { name: 'Over Night', value: 'OverNight' },
        ],
        default: 'OverNight',
        description: 'The time slice template used to filter rate plans',
      },
      {
        displayName: 'Promo Code',
        name: 'promoCode',
        type: 'string',
        default: '',
        description: 'The promo code for special offers',
      },
      {
        displayName: 'Corporate Code',
        name: 'corporateCode',
        type: 'string',
        default: '',
        description: 'The code for corporate rates',
      },
    ],
  },
];
