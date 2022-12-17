const { User } = require('../models');
const { RequestError } = require('../utils');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const registerController = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }
    const user = await User.findOne({ email });
        
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash("password", 10);

    const newUser = await User.create({ email, password: hashPassword, subscription });

    res.status(201).json({user: {email, subscription: newUser.subscription}});
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }

    const user = await User.findOne({ email });
        
    if (!user) {
        throw RequestError(401, "Email or password is wrong");
    }

console.log("user => ", user )

    const checkedpassword = bcrypt.compare(password, user.password);

console.log("checkedpassword => ", checkedpassword )

    if (!checkedpassword) {
        throw RequestError(401, "Email or password is wrong");
    }

    // create token

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });



    res.status(200).json({ token, user: {email, subscription: user.subscription }});
};


module.exports = {registerController, loginController};