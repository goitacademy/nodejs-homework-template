const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, 'Email in use');
    }
    // Хэширование пароля
    const hashPassword = await bcrypt.hash(password, 10);
    // В создании базы уже передаем не пароль,
    //  а переназначаем на хэшированный пароль
    const result = await User.create({ email, password: hashPassword });

    res.status(201).json({
        user: { email: result.email, subscription: result.subscription },
    });
};

module.exports = register;
