import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { dbOptions } from '../../../src/config/dbOptions';
import { Client } from 'pg';

export const createProduct = async (event) => {
	let client: any;

	try {
        const { body } = event;
        console.log('event body', body);
        const { title, description, price, count } = body;
        console.log('params', title, description, price, count);

		client = new Client(dbOptions);
		await client.connect();

        await client.query('BEGIN');

		const productsResponse = await client.query(`insert into products (title, description, price) values ('${title}', '${description}', ${price}) returning *`);
        const product = productsResponse.rows[0];
        console.log('db products query result', productsResponse);

        const stockResponse = await client.query(`insert into stocks (product_id, count) values ('${product.id}', ${count}) returning *`);
        if (!stockResponse.rows[0] ) {
            throw Error('unable create stock');
        }

        await client.query('COMMIT');

      	return formatJSONResponse(product);
    } catch (e) {
        await client.query('ROLLBACK');
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

export const main = middyfy(createProduct);
