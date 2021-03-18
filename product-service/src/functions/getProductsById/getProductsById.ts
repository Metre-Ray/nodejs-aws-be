import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { products } from '@data/products';

export const getProductsById = async (event) => {
    try {
        const id = +event.pathParameters.productId;
        if (Number.isNaN(id)) {
            return {
                statusCode: 400,
                body: {
                    message: 'Invalid product id',
                },
            }
        }

        const product = products.find(prod => prod.id === id);
        if (product) {
            return formatJSONResponse(product);
        }
        return {
            statusCode: 404,
            body: {
                message: 'Product not found',
            },
        }

    } catch (e) {
        return {
            statusCode: 500,
            body: {
                message: `Server error: ${e.message}`,
            },
        }
    }
}

export const main = middyfy(getProductsById);
