const { Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar")

const { User } = require("../../models/users");
const { SECRET_KEY } = process.env;
const path = require("path");
const fs = require("fs/promises")


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email)
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const data = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  console.log(data);
  res.status(201).json({
    Status: "Created",
    code: 201,
    ResponseBody: {
      user: {
        email: email,
        subscription: "starter",
        avatarURL
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const getCurrentUser = (req, res) => {
  console.log("req.user", req.user);

  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const data = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({
    message: "contact successfully edit",
    statusOperation: "success",
    data,
  });
};

const avatarsDir = path.join(__dirname,"../../","public","avatars")

const updateAvatar = async (req,res) =>{
  const {path:tempUpload, originalname} = req.file;
  const {_id:id} = req.user
  const imageName = `${id}_${originalname}`
  try {
    const resultUpload = path.join(avatarsDir,imageName);
    await fs.rename(tempUpload,resultUpload);
    const avatarURL = path.join('public',"avatars",imageName)
    await User.findByIdAndUpdate(req.user._id, {avatarURL})
    res.json({code:200,responceBody:{avatarURL}})
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error
  }

}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar
};
