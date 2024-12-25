const express = require('express');
const router = express.Router();
const { PostAddressToNID, GetAllAddressToNID, GetAddressToNIDById, UpdateAddressToNID, CancelAddressToNID } = require('./AddressToNIDController');
const cloudinaryUploadMiddleware = require('../Middleware/FileUpload');
// Route to handle server posting
router.post('/AddressToNID', PostAddressToNID);

router.get('/AddressToNID', GetAllAddressToNID );

router.get('/AddressToNID/:id', GetAddressToNIDById );

router.put('/AddressToNID/:id',cloudinaryUploadMiddleware('uploads'), UpdateAddressToNID );

router.put('/AddressToNIDCancel/:id', CancelAddressToNID);


module.exports = router;
