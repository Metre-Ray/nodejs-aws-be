import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
// import schema from './schema';
// import { IProduct } from '@functions/model';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbOptions } from '../../../src/config/dbOptions';
import { Client } from 'pg';

export const getProductsList = async () => {
	let client: any;

	try {
		client = new Client(dbOptions);
		await client.connect();

		const { rows: products } = await client.query(`select * from products left join stocks on (products.id = stocks.product_id)`);
		console.log('products', products);

      	return formatJSONResponse(products);
    } catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: `Server error: ${e.message}`,
			}),
		}
    } finally {
        client.end();
    }
}

export const main = middyfy(getProductsList);
