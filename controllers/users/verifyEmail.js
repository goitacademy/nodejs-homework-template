const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async(req, res) => {   
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    //чи є користувач з таким кодом в базі
    if(!user){
        throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {verify:true, verificationToken:"" });
    // verify:true -юзер підтвердив веріфікацію, verificationToken:"" - щоб більше не зміг відправити підтвердження

    return res.status(200).json({
        message:"Verification successful"
    })
};

 module.exports = {
    verifyEmail:ctrlWrapper(verifyEmail)
 }

  