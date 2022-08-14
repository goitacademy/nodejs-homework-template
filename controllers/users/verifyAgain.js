const { User } = require("../../models")
const { sendEmail } = require("../../helpers");
const verifyAgain = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!email) {
        res.status(400).json({
            message: "missing required field email"
        })  
    }
    if (user.verify) {
        res.status(400).json({
            message: "Verification has already been passed"
        }) 
    } else {
        const mail = {
            to: email,
            subject: "Подтверждение email",
            html:`<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подверждения<a/>`
        }; 
        await sendEmail(mail);
        res.json({
            message:  "Verification email sent"
        })
    }

  
 
}
module.exports = verifyAgain;