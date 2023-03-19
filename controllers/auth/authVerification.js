const Users = require('../../schemas/users')
const { findUserByVerificationToken } = require("../../models/users");

const authVerification = async (req, res, next) => {
 const {verificationToken} = req.params;
let user = await findUserByVerificationToken(verificationToken);
console.log(verificationToken, user)
if (!user) {
   return res.json({
        status : 'Error',
        code: 404,
        data : {
            message: 'User not found'
        }
    });
};

user.setVerify();
user.setVerificationToken(null);
await user.save();
return res.json({
    status : 'Success',
    code: 200,
    data: {
        message: 'Verification successful'
    }
})

};

module.exports={authVerification}