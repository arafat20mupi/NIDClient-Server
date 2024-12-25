const UserSchema = require('../User/UserSchema');
const NIDUserPassSchema = require('./NIDUserPassSchema');
const cloudinary = require('cloudinary').v2;

// Utility function for file upload
const uploadFileToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: folder || 'uploads',
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Failed to upload file to Cloudinary');
    }
};

// Post a new ID PDF
exports.PostUserPassSet = async (req, res) => {
    try {
        const { idNumber, method, userId, whatsApp } = req.body;
        // Validate input
        if (!idNumber || !method || !userId, !whatsApp) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check balance
        if (user.balance < 60) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Deduct balance and save user
        user.balance -= 60;
        await user.save();

        // Handle file upload
        let fileUrl = null;
        if (req.file) {
            fileUrl = await uploadFileToCloudinary(req.file.path, 'uploads');
        }

        // Save to database
        const newServer = new NIDUserPassSchema({
            ...req.body,
            file: fileUrl,
        });
        await newServer.save();

        return res.status(201).json({ message: 'Server posted successfully', server: newServer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Update an existing ID PDF// Update an existing ID PDF with the uploaded file URL
exports.UpdateUserPassSet = async (req, res) => {
    try {
        const { id } = req.params;

        const server = await NIDUserPassSchema.findById(id);
        if (!server) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        if (!req.fileUrl) {
            return res.status(400).json({ error: 'File upload failed or missing' });
        }

        server.file = req.fileUrl;
        server.status = 'Approved';
        await server.save();
        res.status(200).json({ message: 'File uploaded and entry updated', server });
    } catch (error) {
        console.error('Error updating entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.CancelUserPassSet = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback } = req.body;

        if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
            return res.status(400).json({ error: 'Feedback is required' });
        }

        const server = await NIDUserPassSchema.findOne({ _id: id });
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }

        server.status = 'Cancel';
        server.feedback = feedback.trim();
        await server.save();

        return res.json({ message: 'Server cancelled successfully', server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to cancel server', details: error.message });
    }
};



// Get all ID PDFs
exports.GetAllUserPassSet = async (req, res) => {
    try {
        const servers = await NIDUserPassSchema.find({});
        return res.json({ servers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get a single ID PDF
exports.GetUserPassSetById = async (req, res) => {
    try {
        const { id } = req.params;
        const server = await NIDUserPassSchema.findById({ userId: id });
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }
        return res.json({ server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};