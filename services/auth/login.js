// вхід користувача


const { basedir } = global;

const { asyncWrapper } = require(`${basedir}/helpers`);

const { User } = require(`${basedir}/models/user`);

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = asyncWrapper(async ({ email, password }) => {
    const user = await User.findOne({ email });
    
    // якщо користувача немає або пароль не валідний- найде замість токена - null,

    if (!user || !user.verify || !user.validPassword(password)) {
        return null;
    }
    
    // тоді створюємо, підписуємо та повертаємо токен (через певний час)

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    await User.findByIdAndUpdate(user._id, { token });

    return { user, token };
});

module.exports = login;