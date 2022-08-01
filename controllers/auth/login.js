const jwt = require("jsonwebtoken");

const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  res.json({
    token,
  });
};
module.exports = login;
