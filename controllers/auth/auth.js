const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { User } = require("../../model/user");
const { HttpError, controllersWrapper } = require('../../helpers');

require("dotenv").config();
const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already is use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword});
  
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password invalid")
    }
    const passwordConpare = await bcrypt.compare(password, user.password);
    if (!passwordConpare) {
        throw HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
        token,
    })
}

module.exports = {
    register: controllersWrapper(register),
    login: controllersWrapper(login)
}