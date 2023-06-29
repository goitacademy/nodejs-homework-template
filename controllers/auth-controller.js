const User = require("../models/user");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    };

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
      },
    });
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    await User.findByIdAndUpdate(id, { token });


    res.status(201).json({
      token,
      user: {
        email: user.email,
        subscription: "starter",
      },
    });
}

const getCurrent = async (req, res) => {
    const { email } = req.user;

    res.json({
      email,
      subscription: "starter",
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "Logout success"
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}