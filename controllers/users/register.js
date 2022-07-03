const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar'); // пакет створює аватарти взалежності від імейлу
const { User } = require('../../models');
const { v4 } = require("uuid");
const {sendEmail} = require('../../helpers')
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
    const verificationToken = v4()
    const avatarURL = gravatar.url(email); 
    const mail = {
        from: 'ortbg1988@meta.ua',
        to: email,
        subject: 'Підтвердження пошти',
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити пошту</a>`,
    }
    await sendEmail(mail);
    const result = await User.create({ email, password: hushPassword, avatarURL,  });
    
    res.status(201).json({ user: result });
}
 
module.exports = register;


