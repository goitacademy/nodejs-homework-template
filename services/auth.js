const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");
const sendEmail = require('../helpers/sendEmail');

const { User } = require('../models/schemas/user');
const { createError } = require("../helpers/errors");

require('dotenv').config();
const secret = process.env.SECRET;


const saltRounds = 10;

const registerUser = async (userData) => {
    const result = await User.findOne({email: userData.email});
    if(result) {
        throw createError(409, 'User already exists.');
    }

    const verificationToken = nanoid();
    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const avatarURL = gravatar.url(userData.email);

    const user =
        await User.create({
            ...userData,
            password: hashedPassword,
            avatarURL,
            verificationToken
        });
    
    const mail = {
        to: userData.email,
        subject: "Welcome to Your Contacts! Confirm Your Email",
        text: "Let's confirm your email address.",
        html: `<a target="_blank" href="http://localhost:8000/api/users/verify/${verificationToken}">confirm your email</a>`
    };

    await sendEmail(mail);

    return user;
}


const loginUser = async (userData) => {
    const result = await User.findOne({ email: userData.email });
    const isValidPassword = await bcrypt.compare(userData.password, result.password);
    if (!result ) {
         throw createError(400, `Email: ${userData.email} is not found`);
    }
    if(!isValidPassword ) {
        throw createError(400, 'Incorrect password');
    }

     const payload = {
    id: result._id,
    email: result.email,
     };
    
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    await User.findByIdAndUpdate({ _id: result._id }, { token });
    return token;
}

const logoutUser = async (id) => {
    const result = await User.findOne({ _id: id });

    if (!result) {
         throw createError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(id, {token: null})
}





module.exports = {
    registerUser, loginUser, logoutUser
}

