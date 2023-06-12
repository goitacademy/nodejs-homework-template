const User = require("../models/user");

const { ctrlWrappers, HttpError } = require("../helpers");

const register = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
        password: newUser.password,
        email: newUser.email,
    });
}

module.exports = {
    register: ctrlWrappers(register),
}