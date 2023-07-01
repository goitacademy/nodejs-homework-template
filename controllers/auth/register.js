const {User} = require("../../models/users");

const { HttpError } = require("../../helpers");

const register = async(req, res) =>{
    const newUser = await User.create(req.body);

    res.status(201).json({
        email: newUser.email,
        // subscription: newUser.subscription,
    })
}

module.exports = register;