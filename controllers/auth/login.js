const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(401, 'Email or password is wrong');
    }

    const passwordCompares = await bcrypt.compare(password, user.password);

    if (!passwordCompares) {
        throw RequestError(401, 'Email or password is wrong');
    }

    if (!user.verify) {
        throw RequestError(401, `User: ${email} not verified`);
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,

        user: { email, subscription: user.subscription },
    });
};

module.exports = login;
