import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export async function offerOperations(
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
    case 'GET offers': {
      endpoint = '/booking/v1/offers';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        propertyId?: string;
        arrival?: string;
        departure?: string;
        timeSliceTemplate?: string;
        timeSliceDefinitionIds?: string[];
        unitGroupIds?: string[];
        unitGroupTypes?: string[];
        channelCode?: string;
        promoCode?: string;
        corporateCode?: string;
        adults?: number;
        childrenAges?: number[];
        includeUnavailable?: boolean;
      };

      if (additionalFields.propertyId) {
        qs.propertyId = additionalFields.propertyId;
      }
      if (additionalFields.arrival) {
        qs.arrival = additionalFields.arrival;
      }
      if (additionalFields.departure) {
        qs.departure = additionalFields.departure;
      }
      if (additionalFields.timeSliceTemplate) {
        qs.timeSliceTemplate = additionalFields.timeSliceTemplate;
      }
      if (additionalFields.timeSliceDefinitionIds) {
        qs.timeSliceDefinitionIds = additionalFields.timeSliceDefinitionIds;
      }
      if (additionalFields.unitGroupIds) {
        qs.unitGroupIds = additionalFields.unitGroupIds;
      }
      if (additionalFields.unitGroupTypes) {
        qs.unitGroupTypes = additionalFields.unitGroupTypes;
      }
      if (additionalFields.channelCode) {
        qs.channelCode = additionalFields.channelCode;
      }
      if (additionalFields.promoCode) {
        qs.promoCode = additionalFields.promoCode;
      }
      if (additionalFields.corporateCode) {
        qs.corporateCode = additionalFields.corporateCode;
      }
      if (additionalFields.adults) {
        qs.adults = additionalFields.adults;
      }
      if (additionalFields.childrenAges) {
        qs.childrenAges = additionalFields.childrenAges;
      }
      if (additionalFields.includeUnavailable) {
        qs.includeUnavailable = additionalFields.includeUnavailable;
      }
      break;
    }

    case 'GET rate-plan-offers': {
      endpoint = '/booking/v1/rate-plan-offers';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        ratePlanId?: string;
        arrival?: string;
        departure?: string;
        channelCode?: string;
        adults?: number;
        childrenAges?: number[];
        includeUnavailable?: boolean;
        overridePrices?: boolean;
      };

      if (additionalFields.ratePlanId) {
        qs.ratePlanId = additionalFields.ratePlanId;
      }
      if (additionalFields.arrival) {
        qs.arrival = additionalFields.arrival;
      }
      if (additionalFields.departure) {
        qs.departure = additionalFields.departure;
      }
      if (additionalFields.channelCode) {
        qs.channelCode = additionalFields.channelCode;
      }
      if (additionalFields.adults) {
        qs.adults = additionalFields.adults;
      }
      if (additionalFields.childrenAges) {
        qs.childrenAges = additionalFields.childrenAges;
      }
      if (additionalFields.includeUnavailable) {
        qs.includeUnavailable = additionalFields.includeUnavailable;
      }
      if (additionalFields.overridePrices) {
        qs.overridePrices = additionalFields.overridePrices;
      }
      break;
    }

    case 'GET service-offers': {
      endpoint = '/booking/v1/service-offers';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        ratePlanId?: string;
        arrival?: string;
        departure?: string;
        channelCode?: string;
        adults?: number;
        childrenAges?: number[];
        onlyDefaultDates?: boolean;
        includeUnavailable?: boolean;
      };

      if (additionalFields.ratePlanId) {
        qs.ratePlanId = additionalFields.ratePlanId;
      }
      if (additionalFields.arrival) {
        qs.arrival = additionalFields.arrival;
      }
      if (additionalFields.departure) {
        qs.departure = additionalFields.departure;
      }
      if (additionalFields.channelCode) {
        qs.channelCode = additionalFields.channelCode;
      }
      if (additionalFields.adults) {
        qs.adults = additionalFields.adults;
      }
      if (additionalFields.childrenAges) {
        qs.childrenAges = additionalFields.childrenAges;
      }
      if (additionalFields.onlyDefaultDates) {
        qs.onlyDefaultDates = additionalFields.onlyDefaultDates;
      }
      if (additionalFields.includeUnavailable) {
        qs.includeUnavailable = additionalFields.includeUnavailable;
      }
      break;
    }

    case 'GET offer-index': {
      endpoint = '/booking/v1/offer-index';
      const additionalFields = this.getNodeParameter('additionalFields', index) as {
        ratePlanId?: string;
        from?: string;
        to?: string;
        channelCode?: string;
        pageNumber?: number;
        pageSize?: number;
      };

      if (additionalFields.ratePlanId) {
        qs.ratePlanId = additionalFields.ratePlanId;
      }
      if (additionalFields.from) {
        qs.from = additionalFields.from;
      }
      if (additionalFields.to) {
        qs.to = additionalFields.to;
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
      break;
    }

    default:
      throw new Error(`Unknown operation: ${operation}`);
  }

  responseData = await apiRequest.call(
    this,
    method,
    endpoint,
    body,
    qs,
  );

  if (Array.isArray(responseData)) {
    returnData.push(...responseData.map(item => ({ json: item })));
  } else {
    returnData.push({ json: responseData });
  }
}
