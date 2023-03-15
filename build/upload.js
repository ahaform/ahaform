import fs from 'fs';
import AWS from 'aws-sdk';

if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY) {
    console.error(
        "Unable to get environment variable S3_ACCESS_KEY_ID or S3_SECRET_ACCESS_KEY"
    );
    process.exit(0);
}

const UPLOAD_LIST = [
    {
        filePath: "./dist/ahaform.js",
        uploadPath: "sdk/ahaform/ahaform.js"
    },
    {
        filePath: "./dist/ahaform.template.js",
        uploadPath: "sdk/ahaform/ahaform.js"
    }
];

upload();

function buildParams(key, content) {
    return {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: content,
        ContentEncoding: "string",
        ACL: "public-read"
    };
}

async function upload() {
    UPLOAD_LIST.forEach(config => {
        const filePath = config.filePath;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (!err) {
                upload2S3(config.uploadPath, data, {
                    ContentType: "application/javascript"
                });
            } else {
                console.error(err);
            }
        });
    });
}

/**
 * s3 client
 * @returns
 */
function getS3Client() {
    // 上传 aws
    AWS.config.region = process.env.S3_REGION;
    AWS.config.update({
        apiVersion: "2006-03-01",
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION
    });
    return new AWS.S3();
}

/**
 * 上传s3
 * @param key
 * @param data
 */
function upload2S3(key, data, options = {}) {
    return new Promise((resolve, reject) => {
        const s3 = getS3Client();
        const params = {
            ...buildParams(key, data),
            CacheControl: "no-cache",
            ...options
        };

        s3.upload(params, (err, result) => {
            if (!err) {
                console.log(key + "上传成功");
                console.log(result);
                resolve(result);
            } else {
                console.log(key + "上传失败", err);
                reject(err);
            }
        });
    });
}
