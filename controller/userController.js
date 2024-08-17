const express = require('express');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../sendEmail/sendEmail');
const registrationSchema = require('../auth/validation')

// Generate a JWT token for the user
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '3h' // expires in 1 hr
    });
};

let userController = {
    userRegistration: async function (req, res) {
        try {
            const { error, value } = registrationSchema.validate(req.body);
            // If validation fails, return a 400 error with the validation message
            if (error) {
                return res.status(400).json({ message: error.details.map(detail => detail.message).join(', ') });
            }
            let { fName, lName, email, mobile_number } = value
            // create a random 6-digit password
            const password = await userController.generatePassword(fName, lName, mobile_number);
            const user = new User({ fName, lName, email, mobile_number, password });
            await user.save();
            // Send a registration email
            let emailsending = await sendEmail.sendMail(fName, lName, email, mobile_number, password);
            res.status(201).json({ message: 'user register successfully', emailsending });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    userLogin: async function (req, res) {
        try {
            let { fName, password } = req.body
            const user = await User.findOne({ fName });  // check email is exist or not

            //check or compare the password 
            if (!user || !(await bcryptjs.compare(password, user.password))) {
                return res.status(401).json({ message: 'invalid First name or password' });
            }
            // Generate a JWT token for the authenticated user
            const token = generateToken(user);
            return res.status(200).json({ message: 'User login successfully', token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    getUser: async function (req, res) {
        try {
            const user = await User.findById(req.user.id)  // get user details
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    uploadUser: async function (req, res) {
        try {
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            let { user_bio } = req.body
            const profile_picture = req.file ? req.file.path : null;
            user.user_bio = user_bio
            user.profile_picture = profile_picture
            // Save the updated user details to the database
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    uploadVideos: async function (req, res) {
        try {
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            let { description } = req.body

            const videos = req.files ? req.files.map(file => file.path) : [];
            user.description = description
            user.videos = videos
            // Save the updated user details to the database
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }

    },

    getuserData: async function (req, res) {
        try {
            // Aggregate query to fetch users with a limit of 5 videos per user
            let users = await User.aggregate([
                {
                    $project: {
                        username: { $concat: ["$fName", " ", "$lName"] },
                        profile_picture: 1,
                        videos: { $slice: ["$videos", 5] } // Limit to the first 5 videos
                    }
                }
            ]);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getUserDataById: async function (req, res) {
        try {
            const userId = req.params.id;
            // Fetch the user by ID and include all videos
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const userData = {
                username: `${user.fName} ${user.lName}`,
                profile_picture: user.profile_picture,
                videos: user.videos
            };
            return res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    generatePassword: function (fName, lName, mobile_number) {
        const fNamePart = fName.substring(0, 2); // First 2 characters of fName
        const lNamePart = lName.substring(0, 3); // First 2 characters of lName
        const mobilePart = mobile_number.toString().slice(-3); // Last 2 digits of mobile_number
        const rawPassword = fNamePart + lNamePart + mobilePart;
        // create random  Password.
        const shuffledPassword = rawPassword.split('').sort(() => 0.5 - Math.random()).join('');
        return shuffledPassword;
    }
}


module.exports = userController;