const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);


const verifyEmail = async(req, res) => {
    //Требо взяти параметри маршруту
    const { verificationToken } = req.param;
    //Тепер нам требо подивитися чи е в базі user користувач с токеном якщо не має то людина взагалі не зареєструвалася або просто забула свій email
    const user = await User.findOne({verificationToken});//Шукаємо користувача с таким токеном
    if ( !user ) {
        console.log("Не має такого користувача с таким токеном");
        throw createError(404);
    }

    //якщо є такий користувач то ми оновлюємо запис в файл
    await User.findByIdAndUpdate(user._id, {verificationToken: "", verify: true});
    res.json({
        message: 'verification successful'
    })
}

module.exports = verifyEmail;

//Оскількі ми будемо працювати з user то нам требо експортувати моделі
//В логине когда совпадают пароль и емайл то видается токен на надо добавить проверку на подтверждение регистрации в файле login.js