const { User } = require("../../models/user");
const { HttpError } = require("../../Utilities");
const nodemailer = require("nodemailer");
require('dotenv').config();

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user ) {
        throw HttpError(404, "User not found");
    }

    if(user.verify){
        throw HttpError(400, "Verification has already been passed");
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });
    
      const verifyEmail = {
        to: "dirtyrider277@gmail.com",
        from: "pussy1453@meta.ua",
        subject: "Вітаю з реєстрацією!",
        html: `<a target ="_blank" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" style="color: red;">Натисніть сюди, щоб підвердити адресу своєї електронної скриньки</a>`,
        text: "Натисніть сюди, щоб підвердити адресу своєї електронної скриньки",
      };
    
      transport
        .sendMail(verifyEmail)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));

    res.json({
        status: "success",
        code: 200,
        message: "Verification email sent",
    });
    
    }

module.exports = resendVerifyEmail;