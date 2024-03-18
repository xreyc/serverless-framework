const AWS = require("aws-sdk");
const formidable = require('formidable');

const s3 = new AWS.S3();

/** Uploade File 1 - Base64 upload */
exports.uploadFile1 = async (event, context, callback) => {
    try {
        /** Get request data */
        const requestBody = JSON.parse(event.body);
        const base64EncodedFile = requestBody.file;
        
        /** Decode Base64 */
        const decodedFile = Buffer.from(base64EncodedFile, 'base64');

        /** Upload to S3 */
        const params = {
            Bucket: process.env.S3_UPLOAD_BUCKET_1,
            Key: `${Date.now()}_uploadfile1.txt`,
            Body: decodedFile,
            ContentType: 'text/plain',
        }
        const uploadResult = await s3.upload(params).promise();

        /** Response */
        const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Successfully uploaded',
              data: {
                location: uploadResult.Location,
              }
            }),
        }
        callback(null, response);
    } catch(err) {
        const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            }),
        }
        callback(null, response);
    }
}

function uploadNewFile(event) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(event.body, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err);
                return reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                });
            }

            const file = files.file;

            /** Upload to S3 */
            const params = {
                Bucket: process.env.S3_UPLOAD_BUCKET_1,
                Key: `uploads2/${Date.now()}_${file.name}`,
                Body: require('fs').createReadStream(file.path),
                ContentType: file.type,
            }
            s3.upload(params, (s3Err, data) => {
                if(s3Err) {
                    return reject(s3Err);
                }
                return resolve(data);
            });
        });
    });
}

/** Uploade File 2 - Multiplepart upload */
exports.uploadFile2 = async (event, context, callback) => {
    try {
        /** Get request data */
        await uploadNewFile(event);

        /** Response */
        const response = {
            statusCode: 200,
            body: JSON.stringify({
            message: 'Successfully uploaded',
            data: {
                location: uploadResult.Location,
            }
            }),
        }
        callback(null, response);
    } catch(err) {
        console.log(err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            }),
        }
        callback(null, response);
    }
}

/** Get file */
exports.getFile = async (event, context, callback) => {
    try {
        /** Get request data */
        const fileKey = event.queryStringParameters['key'];

        /** Upload to S3 */
        const params = {
            Bucket: process.env.S3_UPLOAD_BUCKET_1,
            Key: fileKey,
        }
        const fileData = await s3.getObject(params).promise();

        /** Response */
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: fileData.Body.toString('utf-8'),
        }
        callback(null, response);
    } catch(err) {
        const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: err
            }),
        }
        callback(null, response);
    }
}