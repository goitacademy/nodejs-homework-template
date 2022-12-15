const { User } = require('../models');
const { RequestError } = require('../utils');
const bcrypt = require('bcryptjs')


const registerController = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }
    const user = await User.findOne({ email });
        
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const newUser = await User.create({ email, password });

    res.status(201).json({newUser});
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }
    const user = await User.findOne({ email, password });
        
    if (!user) {
        throw RequestError(401, "Email or password is wrong");
    }

    res.status(201).json({user});
};


module.exports = {registerController};