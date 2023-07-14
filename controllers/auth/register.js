const {User} = require("../../models/user");

const {HttpError, ctrlWrapper} = require("../../helpers");

const register = async(req, res) => {
    const newUser = await User.create(req.body);
    console.log(req.body);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

module.exports = ctrlWrapper(register);

