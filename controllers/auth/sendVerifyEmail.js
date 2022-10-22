const { RequestError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');

const sendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;
    const { BASE_URL } = process.env;

    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(404, 'Not Found');
    }
    if (user.verify) {
        throw RequestError(400, 'Verification has already been passed');
    }
    const mail = {
        to: email,
        from: 'gnaticoleg@ukr.net',
        subject: 'Потверждение email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Нажмите для потверждения</a>`,
    };

    await sendEmail.sendMail(mail);

    res.json({ message: 'Verification email sent' });
};

module.exports = sendVerifyEmail;
