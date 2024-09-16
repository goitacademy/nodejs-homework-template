const { basedir } = global;

const { createError, sendEmail } = require(`${basedir}/helpers`);
const { User, schemas } = require(`${basedir}/models/user`);

const resendVerifyEmail = async(req, res) => {
    //Переверяємо тіло
    const { email } = req.body;
    const { error } = schemas.email.validate({email});
    if ( error ) {
        throw createError(400, error.message);
    }

    //Шукаємо чи є в базі такий користувач який хоче щоб йому ще раз прислали email для варіфікації
    const user = await User.findOne({email});
    if (!user) {
        throw createError(404);
    }

    if (user.verify) {
        throw createError(400, "Verification has already been passed")
    }
    //якщо такий користувач є ми повині ще раз створити  листа

    const mail = {
        to: email,
        subject: "Підтвердження регістрації на сайті",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}>Натисніть для підтвердження регістрації</a>`//ендпоіт веріфікацію нам требо створити тобто маршрут api/auth/verify/${verifycationToken} для цього йдемо в routes/api/auth
    }

    //Відправити його
    await sendEmail(mail);
    //І повирнути відповідь що ми успішно зробили
    res.json({
        message: "Verification email sent"
    })

}

module.exports = resendVerifyEmail;

//В цьому випадку нам требо експортувати не тільки модель а токож скласти схему до варіфікації це робиться в models/user