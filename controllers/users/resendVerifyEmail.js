const {ctrlWrapper, HttpError, sendEmail} = require('../../helpers');
const { User } = require('../../models/user');

const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(400, 'Email not found');
    }
    if(user.verify) {
        throw HttpError(400, 'Verification has already been passed');
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a> `
    };

    await sendEmail(verifyEmail);

    res.status(200).json({message: "Verification email sent"});

}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}