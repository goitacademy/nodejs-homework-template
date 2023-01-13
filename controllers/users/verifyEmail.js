const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const { verify } = require("jsonwebtoken");


const verifyEmail = async (req, res) => {
    const {verificationToken} = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, 'User not found');
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  
    res.json({
        status: "OK",
        code: 200,
        ResponseBody: {
             message: 'Verification successful'
         }

    })
};


module.exports = verifyEmail;