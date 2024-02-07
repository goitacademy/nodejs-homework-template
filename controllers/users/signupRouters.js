import schema from "../validators/users/signupValidator.js";
import newAvatar from "../service/gravatar.js";
import User from "../service/schemas/user.js";

async function signupUser(req, res, next) {
  const { email, password } = req.body;
  const avatar = newAvatar(email);
  const resultValidate = schema.validate(req.body);

  if (resultValidate.error) {
    return res.status(400).json({ message: resultValidate.error.message });
  } else {
    const user = await User.findOne({ email }, { _id: 1 }).lean();
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    try {
      const newUser = new User({ email, password, avatarURL: avatar });
      await newUser.setPassword(password);
      await newUser.save();
      return res.status(201).json({ message: "User created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

export default signupUser;
