module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.url.startsWith('/upload') && ctx.request.method === 'POST') {
      const files = ctx.request.files;
      
      if (files) {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
          'image/bmp',
          'image/tiff',
          'application/pdf'
        ];
        
        const maxSize = 10 * 1024 * 1024; // 10 MB
        
        // Handle both single file and multiple files
        const filesToCheck = files.files ? (Array.isArray(files.files) ? files.files : [files.files]) : [];
        
        for (const file of filesToCheck) {
          // Check file type
          if (!allowedTypes.includes(file.type)) {
            ctx.status = 400;
            ctx.body = {
              error: {
                status: 400,
                name: 'ValidationError',
                message: `File type "${file.type}" is not allowed. Only images (JPEG, PNG, GIF, WebP, SVG, BMP, TIFF) and PDF files are permitted.`,
                details: {
                  allowedTypes: allowedTypes,
                  receivedType: file.type
                }
              }
            };
            return;
          }
          
          // Check file size
          if (file.size > maxSize) {
            ctx.status = 400;
            ctx.body = {
              error: {
                status: 400,
                name: 'ValidationError',
                message: `File size ${Math.round(file.size / 1024 / 1024 * 100) / 100}MB exceeds the maximum allowed size of 10MB.`,
                details: {
                  maxSize: '10MB',
                  receivedSize: `${Math.round(file.size / 1024 / 1024 * 100) / 100}MB`
                }
              }
            };
            return;
          }
        }
      }
    }
    
    await next();
  };
};
