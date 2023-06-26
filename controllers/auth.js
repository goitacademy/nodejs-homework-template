const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');
const { modelNames } = require('mongoose');

const register = async(req, res) => {
    const newUser = await User.create(req.body);

    res.json({
        email: newUser.email,
        name: newUser.name,
    })
}

module.exports = {
    register: ctrlWrapper(register),
}