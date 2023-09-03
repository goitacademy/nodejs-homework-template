const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email is already in use")
    };
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: passwordHash });
    

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    });


});
module.exports = register;