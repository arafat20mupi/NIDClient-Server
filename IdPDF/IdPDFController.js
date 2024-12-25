const UserSchema = require('../User/UserSchema');
const IdPDFSchema = require('./IdPDFSchema');


// Post a new ID PDF
exports.PostIdPdf = async (req, res) => {
    try {
        const { idNumber, method, userId } = req.body;

        // Validate input
        if (!idNumber || !method || !userId) {
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

        // Save to database
        const newServer = new IdPDFSchema({
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
exports.UpdateIdPdf = async (req, res) => {
    try {
        const { id } = req.params;

        const server = await IdPDFSchema.findById(id);
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

exports.CancelIdPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback } = req.body;

        if (!feedback || typeof feedback !== 'string' || !feedback.trim()) {
            return res.status(400).json({ error: 'Feedback is required' });
        }

        const server = await IdPDFSchema.findOne({ _id: id });
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
exports.GetAllIdPdf = async (req, res) => {
    try {
        const servers = await IdPDFSchema.find({});
        return res.json({ servers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get a single ID PDF
exports.GetIdPdfById = async (req, res) => {
    try {
        const { id } = req.params;
        const server = await IdPDFSchema.findById({ userId: id });
        if (!server) {
            return res.status(404).json({ error: 'Server not found' });
        }
        return res.json({ server });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};