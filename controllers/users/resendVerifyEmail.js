const ctrlWrapper = require("../../utils/ctrlWrapper");
const {resendVerificationEmail} = require('../../services/userServices');


const resendVerifyEmail = async(req, res) => {
    
    await resendVerificationEmail(req);
    res.json({
    message: "Verification email sent"
});

};

module.exports = {resendVerifyEmail: ctrlWrapper(resendVerifyEmail)};