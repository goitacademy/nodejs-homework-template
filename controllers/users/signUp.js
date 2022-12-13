const { User } = require("../../models/user");
const createError = require("http-errors");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  console.log(`111`);
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription: "starter",
      },
    },
  });
};

module.exports = signUp;
