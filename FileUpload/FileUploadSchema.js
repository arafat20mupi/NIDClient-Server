const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
    fileName: String,
    fileUrl: String,
    userID: { type: String, required: true },
    serviceType: String,
    status: {
        type: String,
        default: 'Pending',
        required: true,
        enum: ['Pending', 'Approved', 'Cancelled']
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Pdf', PdfSchema);
