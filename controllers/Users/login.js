const { usersModel } = require("../../models/users");
const { HttpError } = require("../../Helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersModel.findOne({ email });
  if (!user || !user.verify) {
    throw HttpError(404, "User not found");
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw HttpError(401, "Invalid email or password");
  }
  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  console.log("token", token);
  await usersModel.findByIdAndUpdate(id, { token });
  res.json({
    status: 200,
    message: "login successful",
    token,
  });
};

module.exports = login;
