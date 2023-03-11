const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { User } = require("../../model/user");
const { HttpError} = require('../../helpers');

require("dotenv").config();
const {SECRET_KEY} = process.env



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
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            email,
            subscription: user.subscription
        }
    })
}

module.exports = login;