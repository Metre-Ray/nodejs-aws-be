import { products } from "@data/products";
import { getProductsById } from "./getProductsById";

describe("getProductsById should return", () => {
    test('404 code if product not found', async() => {
        const event = {
            pathParameters: {
                productId: '-1000',
            },
        };
        expect((await getProductsById(event)).statusCode).toBe(404);
    });

    test('400 code if id is not valid', async() => {
        const event = {
            pathParameters: {
                productId: 'adc',
            },
        };
        expect((await getProductsById(event)).statusCode).toBe(400);
    });

    test('200 code and product in body if product found', async() => {
        const event = {
            pathParameters: {
                productId: '1',
            },
        };
        const searchedProduct = JSON.stringify(products.find(product => product.id === 1));

        const result = await getProductsById(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(searchedProduct);
    })
});

