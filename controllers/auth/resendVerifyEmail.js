const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');
const { BASE_URL } = process.env;

// Повторна відправка листа на пошту для підтвердження e-mail
const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email }); // шукаємо користувача в БД з таким e-mail
    
    // Якщо користувач з данним e-mail не знайденний в ЮД
    if (!user) {
        throw HttpError(404, "User not found");
    }

    // Якщо користувач вже веріфікований
    if (user.verify) {
         throw HttpError(400, "Verification has already been passed");
    }

    // Формуємо лист для підтвердження e-mail
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`
    }

    // Відправляємо лист для підтвердження e-mail
    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    });
}


module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}