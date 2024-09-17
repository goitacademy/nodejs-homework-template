const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpErrors, hlpWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpErrors(409, "User already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // console.log(hashPassword);
  const creatUser = await UserModel.create({
    password: hashPassword,
    email,
  });
  if (!creatUser) {
    throw HttpErrors(400, "Something went wrong");
  }
  const payload = {
    id: createUser._id,
  };

  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const updateTokenUser = await UserModel.findByIdAndUpdate(
    createUser._id,
    { token },
    { new: true }
  );

  res.status(201).json(updateTokenUser);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpErrors(401, "Email or password is wrong");
  }

  const isValidePass = await bcrypt.compare(password, user.password);
if(!isValidePass){
    throw HttpErrors(401, "Email or password is wrong");
    
}

  const hashPassword = await bcrypt.hash(password, 10);
  const payload = {
    id: user._id,
  };
  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  const updateUser = await UserModel.findByIdAndUpdate(user._id, {
    token,
    password: hashPassword,
  });

  res.json(updateUser);
};

const logoutUser = async ( req, res) =>{
 const {id} = req.userId;
 const user = await UserModel.findByIdAndUpdate(id, {token:""}, {new: true})
if (!user){
    throw HttpErrors(404,"Not found")
}
res.status(204);
}

const getCurrentUser = async ( req, res) => {
const {id} = req.userId;
const user = await UserModel.findById(id)
if(!user) {
  throw HttpErrors(401,"Not authorized")
}
res.json(user);
}
module.exports = {
  registerUser: hlpWrapper(registerUser),
  loginUser: hlpWrapper(loginUser),
  logoutUser: hlpWrapper(logoutUser),
  getCurrentUser: hlpWrapper(getCurrentUser),
};
