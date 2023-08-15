import {
  HttpError,
  sendEmail,
  createVerifyEmail,
} from "../../helpers/index.js";
import User from "../../models/user.js";

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = createVerifyEmail({
    email,
    verificationToken: user.verificationToken,
  });

  sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default resendVerifyEmail;
