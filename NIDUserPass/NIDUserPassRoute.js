const express = require('express');
const router = express.Router();
const {
  PostUserPassSet,
  GetAllUserPassSet,
  GetUserPassSetById,
  CancelUserPassSet,
  UpdateUserPassSet
} = require('./NIDUserPassController');
const cloudinaryUploadMiddleware = require('../Middleware/FileUpload');

// Route to create a new UserPassSet entry
router.post('/UserPassSet', PostUserPassSet);

// Route to retrieve all UserPassSet entries
router.get('/UserPassSet', GetAllUserPassSet);

// Route to retrieve a specific UserPassSet entry by ID
router.get('/UserPassSet/:id', GetUserPassSetById);

// Route to update a UserPassSet entry with file upload
router.put('/UserPassSet/:id', cloudinaryUploadMiddleware('uploads'), UpdateUserPassSet);

// Route to cancel a UserPassSet entry with feedback
router.put('/UserPassSetCancel/:id', CancelUserPassSet);

module.exports = router;
