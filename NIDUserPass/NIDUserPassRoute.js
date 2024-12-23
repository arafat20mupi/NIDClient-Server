const express = require('express');
const router = express.Router();
const { upload } = require('../Middleware/Multer');
const { PostUserPassSet, GetAllUserPassSet, GetUserPassSetById, CancelUserPassSet, UpdateUserPassSet } = require('./NIDUserPassController');

// Route to handle server posting
router.post('/UserPassSet', PostUserPassSet);

router.get('/UserPassSet', GetAllUserPassSet );

router.get('/UserPassSet/:id', GetUserPassSetById );

router.put('/UserPassSet/:id',upload.single('file'), UpdateUserPassSet );

router.put('/UserPassSetCancel/:id', CancelUserPassSet);


module.exports = router;
