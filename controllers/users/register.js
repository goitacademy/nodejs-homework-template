const {User} = require("../../models/users");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const {sendEmail} = require("../../helpers");




const register = async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    if (user) {
        return res.status(409).json({
            message: 'Email is used'
        });
    }

    const verificationToken = uuidv4();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
     await User.create({email,password: hashPassword,avatarURL, verificationToken});

     const mail = {
         to: email,
         subject:"Confirm you email",
         html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`
     };
     await sendEmail(mail);

    res.status(201).json({
        user:{
            email,
            "subscription": "starter",
            avatarURL,
            verificationToken
        }
    })
}

module.exports = register;