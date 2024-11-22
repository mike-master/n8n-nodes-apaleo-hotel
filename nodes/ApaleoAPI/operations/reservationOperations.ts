import { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';
import { parseISO, isValid } from 'date-fns';

// Funktion, um eine URL mit Query-Parametern zu erstellen
function constructUrlWithParams(baseUrl: string, params: Record<string, any>): string {
    const queryParams = Object.entries(params)
        .filter(([_, value]) => {
            // Entferne leere Parameter
            if (Array.isArray(value)) return value.length > 0; // Keine leeren Arrays
            return value !== undefined && value !== null && value !== ''; // Keine leeren Strings oder undefinierte Werte
        })
        .map(([key, value]) => {
            // Konvertiere Arrays in kommaseparierte Strings
            if (Array.isArray(value)) {
                return `${key}=${encodeURIComponent(value.join(','))}`;
            }
            return `${key}=${encodeURIComponent(value)}`;
        });

    return `${baseUrl}${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`;
}

// Funktion, um ISO 8601-Datumsformat zu validieren
function validateIso8601Format(date: string): boolean {
    const parsedDate = parseISO(date);
    return isValid(parsedDate);  // Gibt true zurück, wenn das Datum gültig ist
}

export async function reservationOperations(
    node: IExecuteFunctions,
    itemIndex: number,
    operation: string,
    accessToken: string,
    returnData: INodeExecutionData[]
) {
    if (operation === 'GET reservation by ID') {
        const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;
        const expandReservation = node.getNodeParameter('expandReservation', itemIndex, []) as string[];

        const query = expandReservation.length ? { expand: expandReservation.join(',') } : {};
        const options = {
            method: 'GET' as IHttpRequestMethods,
            url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            qs: query,
            json: true,
        };

        try {
            const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
            returnData.push({ json: response });
        } catch (error) {
            throw new Error(`Apaleo GET reservation failed: ${error.message}`);
        }
    } else if (operation === 'PATCH reservation by ID') {
        const reservationId = node.getNodeParameter('reservationId', itemIndex) as string;
        const patchOperations = node.getNodeParameter('patchOperationsReservation', itemIndex) as string;
        let parsedPatchOperations;

        try {
            parsedPatchOperations = JSON.parse(patchOperations);
        } catch (error) {
            throw new Error(`Invalid JSON in patch operations: ${error.message}`);
        }

        const options = {
            method: 'PATCH' as IHttpRequestMethods,
            url: `https://api.apaleo.com/booking/v1/reservations/${reservationId}`,
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            body: parsedPatchOperations,
            json: true,
        };

        try {
            const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);
            returnData.push({ json: response || { message: 'Reservation patched successfully' } });
        } catch (error) {
            throw new Error(`Apaleo PATCH reservation failed: ${error.message}`);
        }
    } else if (operation === 'GET reservations') {
			const from = node.getNodeParameter('from', itemIndex, '') as string;
			const to = node.getNodeParameter('to', itemIndex, '') as string;

			// ISO 8601-Validierung für "from" und "to"
			if (from && !validateIso8601Format(from)) {
					throw new Error(`Invalid 'from' date format. Please use ISO 8601 format.`);
			}
			if (to && !validateIso8601Format(to)) {
					throw new Error(`Invalid 'to' date format. Please use ISO 8601 format.`);
			}
			if (from && to && new Date(from) >= new Date(to)) {
					throw new Error(`'from' date must be earlier than 'to' date.`);
			}
        const params = {
            balanceFilter: node.getNodeParameter('balanceFilter', itemIndex, []) as string[],
            allFoliosHaveInvoice: node.getNodeParameter('allFoliosHaveInvoice', itemIndex, false),
            sort: node.getNodeParameter('sort', itemIndex, []) as string[],
            expand: node.getNodeParameter('expand', itemIndex, []) as string[],
            bookingId: node.getNodeParameter('bookingId', itemIndex, ''),
            propertyIds: node.getNodeParameter('propertyIds', itemIndex, []) as string[],
            ratePlanIds: node.getNodeParameter('ratePlanIds', itemIndex, []) as string[],
            companyIds: node.getNodeParameter('companyIds', itemIndex, []) as string[],
            unitIds: node.getNodeParameter('unitIds', itemIndex, []) as string[],
            unitGroupIds: node.getNodeParameter('unitGroupIds', itemIndex, []) as string[],
            unitGroupTypes: node.getNodeParameter('unitGroupTypes', itemIndex, []) as string[],
            blockIds: node.getNodeParameter('blockIds', itemIndex, []) as string[],
            marketSegmentIds: node.getNodeParameter('marketSegmentIds', itemIndex, []) as string[],
            status: node.getNodeParameter('status', itemIndex, []) as string[],
            dateFilter: node.getNodeParameter('dateFilter', itemIndex, ''),
            from: node.getNodeParameter('from', itemIndex, ''),
            to: node.getNodeParameter('to', itemIndex, ''),
            channelCode: node.getNodeParameter('channelCode', itemIndex, []) as string[],
            sources: node.getNodeParameter('sources', itemIndex, []) as string[],
            validationMessageCategory: node.getNodeParameter('validationMessageCategory', itemIndex, []) as string[],
            externalCode: node.getNodeParameter('externalCode', itemIndex, ''),
            textSearch: node.getNodeParameter('textSearch', itemIndex, ''),
            pageNumber: node.getNodeParameter('pageNumber', itemIndex, 1),
            pageSize: node.getNodeParameter('pageSize', itemIndex, 100),
        };

        const url = constructUrlWithParams('https://api.apaleo.com/booking/v1/reservations', params);

        console.log('Constructed URL:', url);

        const options = {
            method: 'GET' as IHttpRequestMethods,
            url: url,
            headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            json: true,
        };

        try {
            const response = await node.helpers.requestWithAuthentication.call(node, 'apaleoApi', options);

            console.log('Full API Response:', JSON.stringify(response, null, 2));

            if (!response || !response.reservations) {
                throw new Error(`Unexpected API response structure: ${JSON.stringify(response)}`);
            }

            returnData.push(...response.reservations.map((item: any) => ({ json: item })));
        } catch (error) {
            console.error('API Call Error:', error.message);
            throw new Error(`Apaleo GET reservations failed: ${error.message}`);
        }
    }
}
