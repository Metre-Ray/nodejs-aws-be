import { getProductsList } from "./getProductsList";

describe("getProductsList should return", () => {
    test('200 code and array of items in body', async() => {
        const result = await getProductsList();
        console.log('result', result);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body as string).length).toBeTruthy();
    });
});
