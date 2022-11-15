const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.ferify || !user.comparePassword(password)) {
    throw new Unauthorized(
      `Email or password is wrong. Or you are not authorized`
    );
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(user._id, { token }); //3rd param ??  {    new: true,  }
  res.status(200).json({
    ResponseBody: {
      token: token,
      user: {
        user: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
