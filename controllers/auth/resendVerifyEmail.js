// @POST /users/verify/
// отримує body у форматі {email}
// якщо body немає обов'язкового поля email, повертає json з ключем {"message": "missing required field email"} зі статусом 400
// якщо з body все добре, виконуємо повторне надсилання листа з verificationToken на вказаний email, при умові, що користувач не верифікований
// якщо користувач вже пройшов верифікацію, відправити json з ключем { message: "Verification has already been passed"} зі статусом 400 Bad Request


const { basedir } = global;

const service = require(`${basedir}/services/auth`);

const { User } = require(`${basedir}/models/user`);

const { schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const resendVerifyEmail = async(res, req) => {
    const { error } = schemas.verifyResendEmail.validate(req.body);

    if (error) {
        throw createError(400, 'missing required field email');
    }    
    
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw createError(404);
    }

    if (user.verify) {
        throw createError(400, 'Verification has already been passed');
    }

    await service.sendEmail(email, user.verificationToken);

    return res.json({
        status: 'Success',
        code: 200,
        message: 'Verification email sent',
    });
};

module.exports = resendVerifyEmail;