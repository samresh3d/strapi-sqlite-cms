module.exports = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "10mb",
      formLimit: "10mb",
      textLimit: "10mb",
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10 MB limit
      },
    },
  },
  'strapi::session',
  "strapi::favicon",
  "strapi::public",
  // Custom upload validation middleware
  'global::upload-validation',
];
