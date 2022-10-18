const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('req', req);

    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(401, 'Email or password is wrong');
    }

    // Проверяем пароль
    // Bcrypt возвращает false если нет, true если есть.

    const passwordCompares = await bcrypt.compare(password, user.password);

    if (!passwordCompares) {
        throw RequestError(401, 'Email or password is wrong');
    }

    // Передаем тело то есть id
    const payload = {
        id: user._id,
    };

    // Если все совпало создаем токен.
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        // Мне надо как то вытянуть описание сабскриптион
        user: { email, subscription: user.subscription },
    });
};

module.exports = login;
