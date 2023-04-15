const { registrationConfirmation } = require("../../service/users/userService");

module.exports = {
    verificationController: async (req, res)=> {
    const {verificationToken} = req.params;

    await registrationConfirmation(verificationToken);
    
    res.status(200).json({
       message: 'Verification successful'
    });
}
    
} 