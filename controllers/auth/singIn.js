const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const singIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw RequestError(401, `Email or password is wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: { email },
    },
  });
};

module.exports = singIn;
