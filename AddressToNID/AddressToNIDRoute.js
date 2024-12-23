const express = require('express');
const router = express.Router();
const { upload } = require('../Middleware/multer');
const { PostAddressToNID, GetAllAddressToNID, GetAddressToNIDById, UpdateAddressToNID, CancelAddressToNID } = require('./AddressToNIDController');
// Route to handle server posting
router.post('/AddressToNID', PostAddressToNID);

router.get('/AddressToNID', GetAllAddressToNID );

router.get('/AddressToNID/:id', GetAddressToNIDById );

router.put('/AddressToNID/:id',upload.single('file'), UpdateAddressToNID );

router.put('/AddressToNIDCancel/:id', CancelAddressToNID);


module.exports = router;
