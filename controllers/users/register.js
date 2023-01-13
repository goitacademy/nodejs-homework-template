const User = require("../../models/users");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers/SendEmail");
const { nanoid } = require("nanoid");


const register = async (req, res) => {

    const { password, email, subscription, token } = req.body;
    const user = await User.findOne({ email });
       if (user) {
        throw new Conflict(`Email ${email} in use`);
    }

    const avatarURL = gravatar.url(email);
    const   verificationToken = nanoid();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({ password: hashPassword, email, subscription, token, avatarURL, verificationToken })

    const mail = {
        to: email,
        subject: "Website registration confirmation",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        status: "Created",
        code: 201,
        ResponseBody: {
        user: {
            email,
            subscription,
            verificationToken
          
        }
}
    })
}

module.exports = register;