const mongoose = require("mongoose");

const AddressToNidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
    selectedDivision: {
        type: String,
        required: true,
    },

    selectedDistrict: {
        type: String,
        required: true,
    },
    selectedUpazila : {
        type: String,
        required: true,
    },
    union : {
        type: String,
        required: true,
    },
    ward : { 
        type: String,
        required: true,
    },
    village : {
        type: String,
        required: true,
    },
    areaName :{
        type: String,
        required: true,
    },
    fatherName : {
        type: String,
        required: true,
    },
    motherName : { 
        type: String,
        required: true,
    },
    spouseName : { 
        type: String,
    },
    

}, {
    timestamps: true,
});

module.exports = mongoose.model("AddressToNid", AddressToNidSchema);
