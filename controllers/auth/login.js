const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/index");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = bcrypt.compareSync(password, user.password)

    if (!user || !passwordCompare) {
        throw new Unauthorized("Email or password is wrong")
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "3h"})
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription
            }
        }
    })
}

module.exports = {
    login
}