const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized('Email or password is wrong!');
    }
    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    await User.findByIdAndUpdate(user._id, {token});
    res.status(200).json({
        status: "ok",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription: user.subscription,
            }
        }
    })
  
}

module.exports = login;
