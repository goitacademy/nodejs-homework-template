const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.decodePassword(password)) {
        throw Unauthorized("Email or password is wrong")
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    user.token = token;
    user.save();

    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
        }
    })
};

module.exports = login;