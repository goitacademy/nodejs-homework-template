const usersService = require('../../services/users');
const EmailService = require('../../services/email');

const signupUser = async (req, res, next) => {
    try {
        const {email} = req.body;
        const isUserExist = await usersService.isUserExist(email);
        if(isUserExist) {
            return res.status(409).json({status: 'error', code:409, message:'Email in use'})
        }
        const user = await usersService.create(req.body);
        const emailService = new EmailService(process.env.NODE_ENV);
        const isSend = await emailService.sendVerifyEmail(user.name,email,user.verifyTokenEmail)
        delete user.verifyTokenEmail;
        
        if(isSend) {
            return res.status(201).json({user:{user,isSendEmail:isSend}});
        }

    } catch (error) {
        next(error)
    }
}

module.exports = signupUser;