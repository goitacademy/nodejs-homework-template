import { HttpError, createVerifyEmail, sendEmail } from '../../helpers/index.js';
import User from "../../models/user.js";

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email no found")
    }

    if (user.verify) {
        throw HttpError(401, "Verification has already been passed");
    }

    const verifyEmail = createVerifyEmail({ email, verificationToken: user.verificationToken });
    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent",
    })
};

export default resendVerifyEmail;