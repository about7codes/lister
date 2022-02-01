const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// linking User model to Note model
userSchema.virtual('userNotes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'owner',
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Generating a JWT token
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);

    return token;
};

// find user & Compare the password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Unable to login');

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;