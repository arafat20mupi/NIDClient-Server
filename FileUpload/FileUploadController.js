const Pdf = require('./FileUploadSchema');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Ensure the file is saved with a .pdf extension
        cb(null, `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}.pdf`);
    }
});

const upload = multer({ storage });

exports.uploadPdf = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: 'uploads'
        });

        // Save file details to MongoDB
        const pdf = new Pdf({
            fileName: req.file.filename,
            fileUrl: result.secure_url,
            userID: req.body.userId,
            status: req.body.status,
            serviceType: req.body.serviceType
        });
        console.log(pdf);
        await pdf.save();

        res.status(200).json({ message: 'File uploaded successfully', fileUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save file details' });
    }
};

exports.getdataByUserId = async (req, res) => {
    console.log(req.params.userId);
    try {
        const pdf = await Pdf.find({ userID: req.params.userId });
        console.log(pdf);
        res.status(200).json(pdf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateStatusCencel = async (req, res) => {
    try {
        const pdf = await Pdf.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true });
        res.status(200).json({ message: 'Status updated successfully', pdf });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};