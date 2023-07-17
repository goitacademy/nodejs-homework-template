const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { SECRET_KEY } = process.env;

// Авторизація
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    // Якщо користувач з таким email немає БД
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    // Порівнюємо паролі
    const passwordCompare = await bcrypt.compare(password, user.password);

    // Якщо паролі не співпали
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
        token,
    });
}

module.exports = {
    login: ctrlWrapper(login),
}
