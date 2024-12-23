const mongoose = require("mongoose");

const NidUserPassSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
        enum: ['Form', 'Nid', 'Voter'],
    },
    whatsApp: {
        type: String,
        required: true,
    },
    file: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Cancel'],
        default: 'Pending',
    },
    feedback: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("NidUserPass", NidUserPassSchema);
