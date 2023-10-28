// const User = require('../models/schemas/users')
// const bcrypt = require('bcrypt')
// const gravatar = require('gravatar')
// const { v4: uuidv4 } = require('uuid')
// const { sendEmail } = require('./sendEmail')
// const { BASE_URL } = process.env

// const handleConflict = async (req, res, email, password) => {
//     const saltIter = 10
//     const hashPass = await bcrypt.hash(password, saltIter)
//     const avatarUrl = gravatar.url(email)
//     const verificationToken = uuidv4()

//     const newUser = new User({
//         email,
//         password: hashPass,
//         verify: false,
//         verificationToken,
//         subscription: 'starter',
//         avatarURL: avatarUrl || ''
//     })

//     // const transporter = sendEmail()
//     const transporter = sendEmail
//     const verifyEmail = {
//         to: email,
//         subject: 'Сonfirm your registration',
//         html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
//     }

//     await transporter.sendEmail(verifyEmail)
//     // await transporter(verifyEmail)

//     try {
//         await newUser.save()
//         return res.status(201).json({ user: newUser })
//     } catch (err) {
//         return res.status(500).json({ message: 'Internal Server Error' })
//     }
// }

// module.exports = handleConflict

const User = require('../models/schemas/users');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('./sendEmail');
const { BASE_URL } = process.env;

const handleConflict = async (req, res, email, password) => {
    const saltIter = 10;
    const hashPass = await bcrypt.hash(password, saltIter);
    const avatarUrl = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = new User({
        email,
        password: hashPass,
        verificationToken,
        subscription: 'starter',
        avatarURL: avatarUrl || ''
    });

    const verifyEmail = {
        to: email,
        subject: 'Сonfirm your registration',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm your registration</a>`,
    };

    await sendEmail(verifyEmail);

    try {
        await newUser.save();
        return res.status(201).json({ user: newUser });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = handleConflict;