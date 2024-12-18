const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
    fileName: String,
    fileUrl: String,

},
    { timestamps: true }
);

module.exports = mongoose.model('Pdf', PdfSchema);
