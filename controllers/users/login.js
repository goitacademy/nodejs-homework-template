
const { Unauthorized } = require('http-errors');

const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Unauthorized("Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        data: {
            token,
            user: { email: user.email, subscription: user.subscription },
        },
    });
};

module.exports = login;