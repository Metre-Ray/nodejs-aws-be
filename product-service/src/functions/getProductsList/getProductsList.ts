import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
// import schema from './schema';
// import { IProduct } from '@functions/model';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { products } from '@data/products';

export const getProductsList = async () => {
    try {
      	return formatJSONResponse(products);
    } catch (e) {
		return {
			statusCode: 500,
			body: {
				message: `Server error: ${e.message}`,
			},
		}
    }
}

export const main = middyfy(getProductsList);
