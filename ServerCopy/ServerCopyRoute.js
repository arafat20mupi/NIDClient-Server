const express = require('express');
const {PostServerCopy, GetAllServerCopy, GetServerCopyById, UpdateServerCopy, CancelServerCopy} = require('./ServerCopyController');
const cloudinaryUploadMiddleware = require('../Middleware/FileUpload');

const router = express.Router();

// Route to handle server posting
router.post('/ServerCopy', PostServerCopy);

router.get('/ServerCopy', GetAllServerCopy );

router.get('/ServerCopy/:id', GetServerCopyById );

router.put('/ServerCopy/:id',cloudinaryUploadMiddleware('uploads'), UpdateServerCopy );

router.put('/ServerCopyCancel/:id', CancelServerCopy);

module.exports = router;