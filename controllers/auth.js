const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { ctrlWrappers, HttpError } = require("../helpers");

const register = async (req, res) => {
    const { email,password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        password: newUser.password,
        email: newUser.email,
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(201, "Email or password invalid"); 
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(201, "Email or password invalid"); 
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
        token,
    })
}

const getCurrent = async (req, res) => {
    const { email } = req.user;
    res.json({ email });
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    res.json({

    })
}

module.exports = {
    register: ctrlWrappers(register),
    login: ctrlWrappers(login),
    getCurrent: ctrlWrappers(getCurrent),
    logout: ctrlWrappers(logout),
}