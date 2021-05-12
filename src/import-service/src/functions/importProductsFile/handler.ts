import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import * as AWS from "aws-sdk";
const BUCKET = 'mp-bucket';

const importProductsFile: any = async (event) => {
	console.log('event', event);
	try {
		const productName = event.queryStringParameters?.name;

		if (!productName) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'product name is absent' }),
			}
		}

		const s3 = new AWS.S3({ region: 'eu-west-1' });
		const params = {
			Bucket: BUCKET,
			Expires: 300,
			Key: `uploaded/${productName}`,
		};
		const url = await s3.getSignedUrlPromise('getObject', params);
		return {
			statusCode: 200,
			body: url,
		}
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: error.message }),
		}
	}

}

export const main = middyfy(importProductsFile);
