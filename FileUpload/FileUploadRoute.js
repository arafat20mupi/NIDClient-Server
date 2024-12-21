const express = require('express');
const { uploadPdf, getdataByUserId , updateStatusCencel } = require('./FileUploadController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.put('/uploadPdf', upload.single('pdf'), uploadPdf);
router.get('/getOrder/:userId',getdataByUserId );
router.patch('/cancel/:id',updateStatusCencel );

module.exports = router;
 