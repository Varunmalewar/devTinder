const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid ");
    } else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("Name should be between 4 and 50 characters");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password should be strong");
    }
};

const validateEditProfileData = (req) => {
    try {
        const allowedEditFields = ['firstName', 'lastName', 'about', 'gender', 'photoUrl', 'age', 'skills'];
        const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
        if (!isEditAllowed) {
            throw new Error("Invalid fields in request body");
        }

        // Validate string fields if present
        if (req.body.firstName !== undefined) {
            if (typeof req.body.firstName !== 'string') {
                throw new Error("First name must be a string");
            }
            if (req.body.firstName.length < 4 || req.body.firstName.length > 50) {
                throw new Error("First name should be between 4 and 50 characters");
            }
        }
        if (req.body.lastName !== undefined) {
            if (typeof req.body.lastName !== 'string') {
                throw new Error("Last name must be a string");
            }
            if (req.body.lastName.length < 4 || req.body.lastName.length > 50) {
                throw new Error("Last name should be between 4 and 50 characters");
            }
        }
        if (req.body.about !== undefined) {
            if (typeof req.body.about !== 'string') {
                throw new Error("About must be a string");
            }
            if (req.body.about.length < 10 || req.body.about.length > 200) {
                throw new Error("About should be between 10 and 200 characters");
            }
        }
        // Additional validations can be added here for other fields if needed

        return true;
    } catch (err) {
        throw new Error("Error validating edit profile data: " + err.message);
    }
};

module.exports = {
    validateSignUpData,
    validateEditProfileData
};
