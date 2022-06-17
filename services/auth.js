const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

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

    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const avatarURL = gravatar.url(userData.email);

    const user =
        await User.create({
            ...userData,
            password: hashedPassword,
            avatarURL
        });

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

