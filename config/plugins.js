module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
        s3ForcePathStyle: false,
        signatureVersion: 'v4',
        rootPath: 'assets',
      },
      actionOptions: {
        upload: { ACL: null },
        uploadStream: { ACL: null },
      },
      // File size limit: 10 MB (in bytes)
      sizeLimit: 10 * 1024 * 1024, // 10 MB
    },
  },
});
