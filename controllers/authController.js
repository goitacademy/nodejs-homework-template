const { registration, login, logout } = require('../models/authService');

const { User } = require('../db/userModel');
const { Conflict, NotFound } = require("http-errors");

const {RequestError } = require("../helpers/errors")

const { userSchema } = require('../helpers/validation');

const sendEmail= require('../helpers/sendEmail');



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
    await registration(email, password);
 
    res.status(201).json({
        message: "created",
        code: 201,
        user: {
            email,
            subscription: "starter",
        },
    });
};

const verificationController = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw new NotFound();
    };
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
 
    res.status(200).json({
        message: "Verification successful",
        code: 200,
    });
};

const resendVerificationController = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    throw RequestError(404, "missing required field email");
    }
    if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
    }
    
    const mail = {
    to: email,
    subject: "Registration confirmation",
    html: `<a target="_blank"href=" href="http://local host:3000/api/users/verify/${user.verificationToken}>"Confirm your ${email}<a/>`
    };
    
    await sendEmail(mail);
 
    res.status(200).json({
        message: "Verification successful",
        code: 200,
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
    logoutController,
    verificationController,
    resendVerificationController
}

