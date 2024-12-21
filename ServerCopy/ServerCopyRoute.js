const express = require('express');
const { PostServer, GetAllServers } = require('./ServerCopyController');
const { upload } = require('../Middleware/Multer');
const { uploadPdf } = require('../FileUpload/FileUploadController');

const route = express.Router();

route.post('/serverCopy', PostServer);
route.get('/serverCopy', GetAllServers);
route.post('/updateFileAndStatus', upload.single('file'), uploadPdf);

module.exports = route;