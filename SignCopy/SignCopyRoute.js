const express = require('express');
const router = express.Router();
const { PostSignCopy, GetAllSignCopy, GetSignCopyById, UpdateSignCopy, CancelSignCopy } = require('./SignCopyController');
const cloudinaryUploadMiddleware = require('../Middleware/FileUpload');


// Route to handle server posting
router.post('/SignCopy', PostSignCopy);

router.get('/SignCopy', GetAllSignCopy);

router.get('/SignCopy/:id', GetSignCopyById);

router.put('/SignCopy/:id',cloudinaryUploadMiddleware('uploads'),  UpdateSignCopy);

router.put('/SignCopyCancel/:id', CancelSignCopy);


module.exports = router;
