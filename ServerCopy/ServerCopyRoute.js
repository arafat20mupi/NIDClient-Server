const express = require('express');
const { upload } = require('../Middleware/multer');
const {PostServerCopy, GetAllServerCopy, GetServerCopyById, UpdateServerCopy, CancelServerCopy} = require('./ServerCopyController');

const router = express.Router();

// Route to handle server posting
router.post('/ServerCopy', PostServerCopy);

router.get('/ServerCopy', GetAllServerCopy );

router.get('/ServerCopy/:id', GetServerCopyById );

router.put('/ServerCopy/:id',upload.single('file'), UpdateServerCopy );

router.put('/ServerCopyCancel/:id', CancelServerCopy);

module.exports = router;