// import { User } from "#models/User.js";

// export const verifyEmail = async (req, res, next) => {
//   const { verificationToken } = req.params;

//   try {
//     const user = await User.findOne({ verificationToken });

//     if (!user) {
//       return res.status(404).json({ message: "|User not found" });
//     }

//     if (user.verify) {
//       return res.status(400).json({ message: "Verification has already been passed" });
//     }

//     user.verify = true;
//     user.verificationToken = null;
//     await user.save();

//     return res.status(200).json({ message: "Verification successful" });
//   } catch (err) {
//     next(err);
//   }
// };

import { User } from "#models/User.js";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "#utils/email.js";

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "|User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    sendVerificationEmail(user.email, user.verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};
