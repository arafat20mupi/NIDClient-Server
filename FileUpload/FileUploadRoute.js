const express = require('express');
const { getdataByUserId,} = require('./FileUploadController');
const multer = require('multer');
const cors = require('cors');

const router = express.Router();
// Add CORS middleware
router.use(cors({
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

router.get('/getOrder/:userId/:status', getdataByUserId);

module.exports = router;
