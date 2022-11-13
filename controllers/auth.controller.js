const Joi = require("joi");

const { registration, login } = require("../service/authService");

// const { ValidationError } = require("../helpers/errors");

const schema = Joi.object({
  password: Joi.string().min(1).max(60).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  subscription: Joi.string(),
});

async function registrationController(req, res, next) {
  const { email, password, subscription } = req.body;

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }

  const user = await registration(email, password, subscription);
  return res.status(201).json(user);
}

async function loginController(req, res, next) {
  const { email, password } = req.body;

  const loginResult = await login(email, password);
  return res.json(loginResult);
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw new Unauthorized("User does not exists");
  // }
  // const isPasswordTheSame = await bcrypt.compare(password, user.password);
  // if (!isPasswordTheSame) {
  //   throw new Unauthorized("wrong password");
  // }

  // const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
  //   expiresIn: "15m",
  // });

  // user.token = token;
  // await User.findByIdAndUpdate(user._id, user);

  // return res.json({
  //   data: {
  //     token,
  //   },
  // });
}

module.exports = {
  registrationController,
  loginController,
};
