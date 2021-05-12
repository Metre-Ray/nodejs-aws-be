import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

import * as AWS from "aws-sdk";
import * as csv from 'csv-parser';
const BUCKET = 'mp-bucket';

const importFileParser: any = async (event) => {
	console.log('importFileParser event', event);
	try {
        const s3 = new AWS.S3({region: 'eu-west-1'});
		for (const record of event.Records) {
    		const fileName = record.s3.object.key;
			const promise = new Promise<void>((res, rej) => {
				const params = {
					Bucket: BUCKET,
					Key: fileName,
				}
				const objectStream = s3.getObject(params).createReadStream();

				objectStream
					.pipe(csv())
					.on('error', (err) => {
						console.log("stream error", err);
						rej(err);
					})
					.on('end', async () => {
						console.log(`file ${fileName} processed`);
						await s3.copyObject(
							{
								Bucket: BUCKET,
								CopySource: BUCKET + '/' + fileName,
								Key: fileName.replace('uploaded', 'parsed'),
							}
						).promise();
						await s3.deleteObject(
							{
								Bucket: BUCKET,
								Key: fileName,
							}
						).promise();

						res();
					});
			})
			await promise;
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'files successfully processed' }),
		};
    } catch (e) {
        return {
			statusCode: 500,
			body: JSON.stringify({ message: e.message }),
		};
    }

}

export const main = middyfy(importFileParser);
