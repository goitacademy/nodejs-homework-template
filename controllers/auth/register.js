const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;

    const { BASE_URL } = process.env;

    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, 'Email in use');
    }
    const verificationToken = nanoid();

    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
        email,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });

    const mail = {
        to: email,
        from: 'gnaticoleg@ukr.net',
        subject: 'Потверждение email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Нажмите для потверждения</a>`,
    };

    await sendEmail.sendMail(mail);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL,
            verificationToken,
        },
    });
};

module.exports = register;
