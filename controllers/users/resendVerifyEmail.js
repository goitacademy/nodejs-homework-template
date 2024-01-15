const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');

require('dotenv').config();

const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user) throw HttpError(401, "Email not found");

    if(user.verify) throw HttpError(400, "Verification has already been")
}
