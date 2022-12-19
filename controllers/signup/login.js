const { Unauthorized } = require("http-errors");
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //   if (!user) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
  const comparePass = bcrypt.compareSync(password, user.password);
  if (!user || !comparePass) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  // разобраться с ключем --------------

  const token = jwt.sign(payload, "dfherehdh4tsdgd4", { expiresIn: "1h" });
  res.json({
    status: "log in success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
