const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true,
        unique: true,
    },
    userId: { type: String, required: true },
    serviceType: {
        type: String,
        required: true,
    },
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
