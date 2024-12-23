const express = require('express');
const router = express.Router();
const { upload } = require('../Middleware/Multer');
const { PostSignCopy, GetAllSignCopy, GetSignCopyById, UpdateSignCopy, CancelSignCopy } = require('./SignCopyController');


// Route to handle server posting
router.post('/SignCopy', PostSignCopy);

router.get('/SignCopy', GetAllSignCopy);

router.get('/SignCopy/:id', GetSignCopyById);

router.put('/SignCopy/:id',upload.single('file'),  UpdateSignCopy);

router.put('/SignCopyCancel/:id', CancelSignCopy);


module.exports = router;
