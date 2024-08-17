const nodemailer = require('nodemailer');
require('dotenv').config(); // Load variables from a .env file


const sendMail = async (fName, lName, email, mobile_number, password) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email', // SMTP server address
            port: 587, // SMTP port
            secure: false,  // Use TLS (true for port 465, false for other ports)
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            }
        });
        // Set up email options
        let mailOptions = {
            from: '"Email Team" <maddison53@ethereal.email>',
            to: email,
            subject: 'Registration Successful',
            text: `Hello ${fName} ${lName},

             thank you for creating your account : 

                first Name : ${fName}
                mobile Number: ${mobile_number}
                email: ${email}
                password: ${password}`
        };

        // Send the email
        let info = await transporter.sendMail(mailOptions);
        return { info }
    } catch (error) {
        throw new Error('Email sending failed'); // Optional: Throw an error if you want to handle it elsewhere
    }
};


module.exports = { sendMail }