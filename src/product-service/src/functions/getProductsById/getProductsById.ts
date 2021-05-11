import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Client } from 'pg';
import { dbOptions } from '../../../src/config/dbOptions';

export const getProductsById = async (event) => {
    let client: any;

    try {
        console.log('event', event);
        const id = event.pathParameters.productId;

        client = new Client(dbOptions);
        await client.connect();

        const { rows: products } = await client.query(`select * from products left join stocks on (products.id = stocks.product_id) where id = '${id}'`);
        const product = products[0];

        if (product) {
            return formatJSONResponse(product);
        }
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'Product not found',
            }),
        }

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

export const main = middyfy(getProductsById);
