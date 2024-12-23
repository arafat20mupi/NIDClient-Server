const mongoose = require("mongoose");

const SignCopySchema = new mongoose.Schema({
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
    feedback: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("SignCopy", SignCopySchema);
