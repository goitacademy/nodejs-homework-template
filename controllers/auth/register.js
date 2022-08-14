a
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { nanoid } = require("nanoid");

const { basedir } = global;

const { User, schemas } = require( `${basedir}/models/user`);

const { createError, sendEmail } = require(`${basedir}/helpers`);

//Під час регістрації нам требо відправляти листа коли зберігли людину в базі перед тим як зберігти користувача в базі імпортуємо nanoid


const register = async (req, res) => {
     
    const { error } = schemas.register.validate(req.body);
    if ( error ) {
        throw  createError(400, error.message);
    }
    const { email, password } = req.body;
    //Шукаемо чи є вже такий email то помилка 409 Conflict
    const user = await User.findOne({email});
    if ( user ) {
        throw  createError(409, `${email}  Уже существует а ты думал`);
    }

    //Создаем переменную gravatar
    const avatarURL = gravatar.url(email);

    


    //хешуе пароль
    const hashPassword = await bcrypt.hash(password, 10);
    //зберігає в базі

    //створюємо цей verifycationToken і зберігаємо в базі після того як ми успішно зберігли створюємо email який будемо відправляти 
    const verificationToken = nanoid();    

    const result = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    //Після того як зберігли токен в базі створюємо лист

    const mail = {
        to: email,
        subject: "Підтвердження регістрації на сайті",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}>Натисніть для підтвердження регістрації</a>`//ендпоіт веріфікацію нам требо створити тобто маршрут api/auth/verify/${verifycationToken} для цього йдемо в routes/api/auth
    }

    //викликаемо 
    await sendEmail(mail);
     //и відправляемо що все добре
    res.status(201).json({
        name: result.name,
        email: result.email,
    })
}

module.exports = register;