const ServerSchema = require('./ServerCopySchema');
const User = require('../User/UserSchema');


exports.PostServer = async (req, res) => {
    try {
        const { idNumber, method, userId } = req.body;
        // Validate input fields
        if (!idNumber || !method || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Fetch the user from the database
        const user = await User.findById({_id: userId});
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

        // Create and save the new server data
        const newServer = new ServerSchema(req.body);
        await newServer.save();

        // Respond with the created server details
        return res.status(201).json({ message: 'Server posted successfully', server: newServer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.GetAllServers = async (req, res) => {
    try {
        // Fetch all servers from the database
        const servers = await ServerSchema.find({});
        return res.json({ servers });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

