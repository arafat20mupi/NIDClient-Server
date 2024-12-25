const cloudinary = require('cloudinary').v2;

// Middleware to handle file uploads to Cloudinary
const cloudinaryUploadMiddleware = (folder) => async (req, res, next) => {
  try {
    const { base64File } = req.body;

    if (!base64File) {
      return res.status(400).json({ error: 'No file provided in request body' });
    }

    const result = await cloudinary.uploader.upload(base64File, {
      resource_type: 'auto',
      folder: folder || 'uploads',
    });

    req.fileUrl = result.secure_url; // Attach file URL to the request object
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    res.status(500).json({ error: 'File upload to Cloudinary failed' });
  }
};

module.exports = cloudinaryUploadMiddleware;
