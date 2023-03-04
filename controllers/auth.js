const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpErorr, ctrlWrapper } = require("../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpErorr(409, "Email in use");
  }
  const hasePassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hasePassword });

  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
 const { subscription } = user;
  console.log("subscription", subscription);
  if (!user) {
    throw HttpErorr(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpErorr(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });
await User.findByIdAndUpdate(user._id, { token });


  res.json({
    token,
    user: { email, subscription },
  });
};

const getCurrent = async (req, res) => {
   const { email, subscription } = req.user;
    if (!email) {
      throw HttpErorr(401, "Not authorized");
    }
  console.log(email);
  res.json({
    email,
    subscription,
  });
}

const logout = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpErorr(401, "Not authorized");
  }
    
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
  
 }

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};

