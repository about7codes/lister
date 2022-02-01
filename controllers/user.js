const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ error: 'Please enter email and password' });

        const user = await User.create(req.body);
        const token = await user.generateAuthToken();

        user.password = undefined;
        
        res.status(201).json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ error: 'Please enter email and password' });
        
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        
        user.password = undefined;
        
        res.status(200).json({ user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    signup,
    signin
}