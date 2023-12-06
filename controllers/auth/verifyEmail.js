import { User } from "../../models/user/user.js";
import { HttpError } from "../../helpers/index.js";

const verifyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: null,
  });

  res.json({
    message: "Email has been successfully verified",
  });
};

export default verifyEmail;
