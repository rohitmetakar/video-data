const Joi = require('joi');

// Define the validation schema
const registrationSchema = Joi.object({
    fName: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name should have a minimum length of 2 characters',
        'string.max': 'First name should have a maximum length of 50 characters',
    }),
    lName: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name should have a minimum length of 2 characters',
        'string.max': 'Last name should have a maximum length of 50 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    mobile_number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.pattern.base': 'Mobile number must be a 10-digit number',
    }),
});


module.exports = registrationSchema;
