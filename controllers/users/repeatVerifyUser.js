const {findByEmail} = require('../../repository/users')
const EmailService = require('../../services/email');

const repeatVerifyUser = async (req, res, next) => {
    
    try {
        const {email} = req.body;
        const userData = await findByEmail(email);
        if(email && userData.verifyTokenEmail) {
            const emailService = new EmailService(process.env.NODE_ENV);
            const isSend = await emailService.sendVerifyEmail(userData.name,email,userData.verifyTokenEmail);

            if(isSend) {
                return res.status(200).json({message: "Verification email sent"});
            }
        }
        return res.status(400).json({message: "Verification has already been passed"});


    } catch (error) {
        next(error)
    }
}

module.exports = repeatVerifyUser;