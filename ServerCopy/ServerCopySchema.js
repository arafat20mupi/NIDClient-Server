const mongoose = require("mongoose");

const ServerCopySchema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    birthday: {
        type: String,
    },
    method: {
        type: String,
        required: true,
        enum: ['Form', 'Nid', 'Voter'],
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("Server", ServerCopySchema);
