const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized('Email or password is incorrect.')
    }

    const token = user.createToken();
    const { _id } = user;
    await User.findByIdAndUpdate(_id, { token });
    res.json({
        status: 'success',
        code: 200,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};

module.exports = login;