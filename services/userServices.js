const {User, schemas} = require('../models/user');

const HttpError = require("../utils/HttpError");

const ctrlWrapper = require("../utils/ctrlWrapper");

const register = async(req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({newUser});
};


module.exports = {
    register: ctrlWrapper(register),
};
