const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config()

const {User} = require("../../models/user");

const { SECRET_KEY } = process.env;

const {HttpError, ctrlWrapper} = require("../../helpers");

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError (401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError (401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.status(201).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
}

module.exports = ctrlWrapper(login);