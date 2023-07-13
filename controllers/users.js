const { User, authSchemas } = require("../models");

const bcrypt = require("bcryptjs");
const path = require("path");

const Jimp = require("jimp");

const jwt = require("jsonwebtoken");

const fs = require("fs/promises")

const gravatar = require("gravatar");

const avatarDir = path.join(__dirname,"../","public","avatars")

const { SECRET_KEY } = process.env;

const { RequestError } = require("../helpers");

const register = async (req, res, next) => {
  try {
   
    // const user = await User.findOne({email})
    // if (user) {
    //    throw RequestError(409,"Email in use")
    // }
     const {email} = req.body;
    const { password } = req.body;
    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const resizeAvatar = await Jimp.read(avatarURL).resize(250,250).write(avatarURL); 
    const newUser = await User.create({
       ...req.body,
        password: hashPassword,
        resizeAvatar });
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, " Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, " Email or password is wrong");
    }

    const { error } = authSchemas.loginSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
 
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(RequestError(401));
  
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
  } catch (error) {
    next(RequestError(401));
  }
  res.status(204).json({ message: "No Content" });
};

const updateAvatar = async (req,res,next) => {
try {
  const {_id} = req.user
  const {path:tempUpload,originalname} = req.file;
  const fileName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir,fileName);
  await fs.rename(tempUpload,resultUpload);
  const avatarURL = path.join("avatars",fileName);
  await User.findByIdAndUpdate(_id,{avatarURL});
  res.json({avatarURL});
} catch (error) {
 next(RequestError(401));
  
}

}

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
