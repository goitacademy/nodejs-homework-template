const {User} = require('../../models/user')

const {HttpError, ctrlWrapper} = require('../../helpers')

const register = async(req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": "starter",
        }
    })
}

module.exports = {
    register: ctrlWrapper(register),
}