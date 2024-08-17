const mongoose = require('mongoose'); // MongoDB object modeling tool
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const { required } = require('joi');
const { type } = require('../auth/validation');
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //  emails are unique
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true, //  usernames are unique
    },
    password: {
        type: String,
        required: true, //  field is required
    },
    profile_picture: {
        type: String,
    },
    user_bio: {
        type: String,
    },
    videos: {
        type: [String],
    },
    description: {
        type: String,
    },

    resetPasswordToken: String, // Token for password reset
    resetPasswordExpires: Date, // Expiration time for the reset token
});

// Middleware to hash the password before saving user document
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // If password is not modify, move to the next middleware
    }
    const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // hash password with the generated salt
    next(); // Proceed to save user
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// create User model using the schema
const User = mongoose.model('users', userSchema);

module.exports = User;
