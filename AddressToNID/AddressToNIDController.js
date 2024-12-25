const UserSchema = require('../User/UserSchema');
const AddressToNIDSchema = require('./AddressToNIDSchema');
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
exports.PostAddressToNID = async (req, res) => {
    try {
        const {
            userId,
            whatsApp,
            name,
            selectedDivision,
            selectedDistrict,
            selectedUpazila,
            union,
            ward,
            village,
            areaName,
            fatherName,
            motherName,

        } = req.body;

        // Validate required fields
        if (
            !userId ||
            !whatsApp ||
            !name ||
            !selectedDivision ||
            !selectedDistrict ||
            !selectedUpazila ||
            !union ||
            !ward ||
            !village ||
            !areaName ||
            !fatherName ||
            !motherName
        ) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        // Check if user exists
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check balance
        if (user.balance < 350) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Deduct balance and save user
        user.balance -= 350;
        await user.save();


        // Save to database
        const newServer = new AddressToNIDSchema({
            ...req.body,
        });
        await newServer.save();

        return res.status(201).json({ message: 'Server posted successfully', server: newServer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Update an existing ID PDF
exports.UpdateAddressToNID = async (req, res) => {
    try {
        const { id } = req.params;

        const server = await AddressToNIDSchema.findById(id);
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

exports.CancelAddressToNID = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback } = req.body;

        if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
            return res.status(400).json({ error: 'Feedback is required' });
        }

        const server = await AddressToNIDSchema.findOne({ _id: id });
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
exports.GetAllAddressToNID = async (req, res) => {
    try {
        const servers = await AddressToNIDSchema.find({});
        return res.json({ servers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get a single ID PDF
exports.GetAddressToNIDById = async (req, res) => {
    try {
        const { id } = req.params;
        const server = await AddressToNIDSchema.findById({ userId: id });
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }
        return res.json({ server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};