const { usersModel } = require("../../models/users");
const { HttpError } = require("../../Helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersModel.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw HttpError(401, "Invalid email or password");
  }
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  await usersModel.findByIdAndUpdate(user.id, token);
  res.json({
    status: 200,
    message: "login successful",
    token,
  });
};

module.exports = login;
