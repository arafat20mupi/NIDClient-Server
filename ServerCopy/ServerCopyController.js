const ServerSchema = require('./ServerCopySchema');
const User = require('../User/UserSchema');
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

exports.PostServerCopy = async (req, res) => {
    try {
        const { idNumber, method, userId } = req.body;
        // Validate input fields
        if (!idNumber || !method || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Fetch the user from the database
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has enough balance
        if (user.balance < 35) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Deduct balance and save user data
        user.balance -= 35;
        await user.save();

        // Handle file upload
        let fileUrl = null;
        if (req.file) {
            fileUrl = await uploadFileToCloudinary(req.file.path, 'uploads');
        }

        // Save to database
        const newServer = new ServerSchema({
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




exports.UpdateServerCopy = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate file
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Find the server entry
        const server = await ServerSchema.findOne({ _id: id });
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }

        // Upload new file
        const fileUrl = await uploadFileToCloudinary(req.file.path, 'uploads');
        server.file = fileUrl;
        server.status = 'Approved';
        await server.save();

        return res.json({ message: 'Server updated successfully', server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update server', details: error.message });
    }
};

exports.CancelServerCopy = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback } = req.body;

        if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
            return res.status(400).json({ error: 'Feedback is required' });
        }

        const server = await ServerSchema.findOne({ _id: id });
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
exports.GetAllServerCopy = async (req, res) => {
    try {
        const servers = await ServerSchema.find({});
        return res.json({ servers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get a single ID PDF
exports.GetServerCopyById = async (req, res) => {
    try {
        const { id } = req.params;
        const server = await ServerSchema.findById({userId : id});
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }
        return res.json({ server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
