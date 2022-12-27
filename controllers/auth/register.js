const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { HttpError } = require("../../helpers/HttpError");

const register = async (req, res) => {
    const { email, password } = req.body;

    const ckechUser = await User.findOne({ email });

    if (ckechUser) {
        throw HttpError(409, "Email in use");
    }
    
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

module.exports = register;