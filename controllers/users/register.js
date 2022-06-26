const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar'); // пакет створює аватарти взалежності від імейлу
const { User } = require('../../models');
const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict('Email in use');
    }
    const hushPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // Якщо в схемі заданий метод то пароль можна захешувати так:
    // const newUser = new User({name, email});
    // newUser.setPassword(password);
    // newUser.save();
    const avatarURL = gravatar.url(email); 
    const result = await User.create({ email, password: hushPassword, avatarURL });
    res.status(201).json({ user: result });
}
 
module.exports = register;