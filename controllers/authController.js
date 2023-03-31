const { registration, login, logout } = require('../models/authService');
const { User } = require('../db/userModel');
const { Conflict } = require("http-errors");

const { userSchema } = require('../helpers/validation');

const gravatar = require('gravatar');

const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const reqValidate = userSchema.validate(req.body);
    if (reqValidate.error) {
        return res.status(400).json({
            message: reqValidate.error,
            code: 400,
        });
    }
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    };
    
    const avatarURL = gravatar.url(email);
    await registration(email, password);
    res.status(201).json({
        message: "created",
        code: 201,
        user: {
            email,
            subscription: "starter",
            avatarURL,
        },
    });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const reqValidate = userSchema.validate(req.body);
    if (reqValidate.error) {
        return res.status(400).json({
            message: reqValidate.error,
            code: 400,
        });
    }
    const token = await login(email, password);
    res.status(200).json({
        token
    });
};

const logoutController = async (req, res) => {
    const { _id } = req.user;
    await logout(_id);
    res.status(204).json();
};




module.exports = {
    registrationController,
    loginController,
    logoutController
}

