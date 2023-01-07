const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw HttpError(401, "Email or password is wrong"); // "Email invalid"
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong"); // "Password invalid"
  }
  // const payload = {
  //   id: user._id,
  // };

  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const token = "hjdfshfkljasdh.dw34354";
  res.json({
    token: token,
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = login;
