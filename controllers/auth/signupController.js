const bcrypt = require('bcryptjs');
const User = require('../../models/users/users');
const { registrationValiadation } = require('../../valiadators/joiValiadator');
const {sendgrigMail} = require('../../helpers/sendgridMail');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

const signup = async (req, res, next) => {
    try {
        const { error, value } = registrationValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
        const { email, password } = req.body;
        const userI = await User.findOne({ email });
        if (userI) {
            return res.status(409).json({
                message: "Email in use"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = nanoid();
        const avatarURL = gravatar.url(email);
        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
        const verificationEmail = {
            to: email,
            subject: "Verify your email",
            html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here for verificatioin</a>`
        }
        await sendgrigMail(verificationEmail);
        return res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription }  });   
    } catch (err) {
        res.sendStatus(500).json({ message: 'Ooops... Something wrong in DB',});
    }
}

module.exports = {
    signup
}