const { requiredUserSchema } = require("../../service/Schemas/userSchema");
const User = require("../Schemas/userSchema");
const bcrypt = "bcrypt";

const validateUserSchema = (req, res, next) => {
  const validation = requiredUserSchema.validate(req.body);

  if (validation.error) {
    res.status(400).json({
      status: "Bad request",
      message: validation.error.details[0].message,
    });
  } else next();
};

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (user) {
    return res.status(409).json({
      status: "Conflict",
      message: "Email in use",
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
      supscription: "starter",
    });

    res.status(201).json({
      status: "Created",
      data: {
        email: newUser.email,
        subscription: newUser.supscription,
      },
    });
  }
};

module.exports = { validateUserSchema, signUp };
