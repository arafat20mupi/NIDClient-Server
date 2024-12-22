const express = require('express');
const router = express.Router();
const {  PostIdPdf , GetAllIdPdf , UpdateIdPdf} = require('./IdPDFController');
const { upload } = require('../Middleware/Multer');
const { uploadPdf } = require('../FileUpload/FileUploadController');


// Route to handle file uploads
router.post('/upload', upload.single('file'), uploadPdf);

// Route to handle server posting
router.post('/IdPdf', PostIdPdf);

router.get('/IdPdf', GetAllIdPdf);

router.put('/IdPdf/:id',upload.single('file'),  UpdateIdPdf);

module.exports = router;
