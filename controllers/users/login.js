const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;
const {User} = require("../../models/user");
const {ControllerWrapper, HttpError} = require("../../utils/index");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, `No user with such email`);
    };

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        throw HttpError(401, `Wrong password`);
    };

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({token: token, user: {email: user.email, password: user.subscription}});
};

module.exports = ControllerWrapper(login);