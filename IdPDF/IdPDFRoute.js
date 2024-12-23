const express = require('express');
const router = express.Router();
const {  PostIdPdf , GetAllIdPdf , UpdateIdPdf, CancelIdPdf,GetIdPdfById } = require('./IdPDFController');
const { upload } = require('../Middleware/multer');


// Route to handle server posting
router.post('/IdPdf', PostIdPdf);

router.get('/IdPdf', GetAllIdPdf);

router.get('/IdPdf/:id', GetIdPdfById);

router.put('/IdPdf/:id',upload.single('file'),  UpdateIdPdf);

router.put('/IdPdfCancel/:id', CancelIdPdf);


module.exports = router;
