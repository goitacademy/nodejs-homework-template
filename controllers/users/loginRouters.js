import schema from "../validators/users/signupValidator.js";
import jwt from "jsonwebtoken";
import User from "../service/schemas/user.js";

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const resultValidate = schema.validate(req.body);
  if (resultValidate.error) {
    return res.status(400).json({ message: resultValidate.error.message });
  } else {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const newToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "12h",
      });

      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            token: newToken,
          },
        },
        {
          upsert: false,
        }
      );
      const newUser = {
        token: newToken,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      };

      return res.status(200).json(newUser);
    } else {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
  }
}

export default loginUser;
