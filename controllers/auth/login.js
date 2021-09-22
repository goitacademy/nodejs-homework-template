const bcrypt = require("bcryptjs");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
    // return res.status(401).json({
    //   status: "Unauthorized",
    //   code: 401,
    //   message: "Email or password is wrong",
    // });
  };

  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    throw new Unauthorized("Email or password is wrong");
  };

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY,
    { expiresIn: "2h", }
  );

  await User.findByIdAndUpdate(user._id, { token }, { new: true });

  res.status(200).json({
    status: "OK",
    code: 200,
    token,
  });
};

module.exports = login;
