import { Request, Response } from "express";
import { User } from "../../models/user/user";
import { HttpError } from "../../helpers";

const verifyEmail = async (req: Request, res: Response) => {
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
