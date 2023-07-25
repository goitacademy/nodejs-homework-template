const { User } = require("../../models");
const service = require("../../service");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("email,password :>> ", email, password);
  const user = await User.findOne({ email });

  service.CheckByError(user, 409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(200).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = service.ctrlWrap(register);
