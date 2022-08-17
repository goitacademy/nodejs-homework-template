const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { Conflict } = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const { helper, auth: service } = require("../../service");


const register = async (req, res) => {
    const { password, email, subscription, token, role } = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const user = await service.registerFind({ email });
    if (user) {
        throw new Conflict("User with such email already exists");
    };
    await service.registerCreate({
        hashPassword,
        email,
        subscription,
        token,
        role,
        avatarURL,
        verificationToken
    });
    const mail = {
        to: email,
        subject: "Email confirmation",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm</a>`
    };
    await helper.sendEmail(mail);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription,
                role,
                avatarURL,
                verificationToken
            }
        }
    });
};

module.exports = register;
