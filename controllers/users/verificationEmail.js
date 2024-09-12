const ctrlWrapper = require("../../utils/ctrlWrapper");
const {verifyEmail} = require('../../services/userServices');


const verificationEmail = async(req, res) => {

    await verifyEmail(req);
    res.json({
        message: 'Verification successful',
    });
};

module.exports = {verificationEmail: ctrlWrapper(verificationEmail)};