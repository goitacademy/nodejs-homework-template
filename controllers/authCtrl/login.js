const asyncHandler = require('express-async-handler');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const { schemas: { loginSchema } } = require('../../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = asyncHandler(async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {

        next(HttpError(400, error.message))
    };
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is invalid")
    };

    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    };

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw HttpError(401, "Email or password is invalid")
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token })

    res.status(200).json({
        'token': token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })

});

module.exports = login;