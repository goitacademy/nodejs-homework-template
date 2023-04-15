const {ResendingVerificationError}=require("../../helper/index");
const { resendingConfirmation } = require("../../service/users/userService");

module.exports = {
    resendingController: async (req, res)=> {
        const { email } = req.body;
        if (!email) {
            throw new ResendingVerificationError("missing required field email")
        }

    await resendingConfirmation(email);
    
    res.status(200).json({
       message: 'Verification email sent'
    });
}
    
} 