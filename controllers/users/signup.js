const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError(400, "Validation error");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
    });

    await user.save();
    console.log(
      `User with email: ${user.email} was successfully singed up`.success
    );
    res.status(201).json({ message: "Signed up", user });

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   throw new HttpError(409, `Email in use`);
    // }
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const user = await User.create({ ...req.body, password: hashPassword });

    // res.status(201).json(user);
  } catch (user) {
    next(user);
  }
};

module.exports = signup;
