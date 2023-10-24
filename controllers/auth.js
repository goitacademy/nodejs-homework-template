const {User} = require('../models/user');

// const HttpErr = require('../helpers/HttpErr');

const ctrlWrapper = require('../helpers/ctrlWrapper');

const register = async (req, res) => {
    const newUrer = await User.create(req.body);
    res.json({
        email: newUrer.email,
        subscription: newUrer.subscription,
    })
};

module.exports = {
    register: ctrlWrapper(register),

};