const {User} = require("../../models");
const {sendEmail} = require("../../helpers");

const writeVerifyEmail = async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        res.status(404).json({message: "User not found"});
    }
    if (user.verify) {
        res.status(400).json({message: "Verification has already been passed"});
    }
    const mail = {
        to: email,
        subject:"Confirm you email",
        html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a>`
    };
    await sendEmail(mail);
    res.status(200).json({message: "Verification email send"});

};

module.exports = writeVerifyEmail;