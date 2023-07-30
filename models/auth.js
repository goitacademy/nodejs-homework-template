const User  = require('./user');
const fs = require("fs/promises");
const bcrypt = require('bcrypt')
const registerSchema = require("../routes/api/registerSchema");
const loginSchema = require("../routes/api/loginSchema");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const gravatar = require("gravatar");
const path = require("path");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const Jimp  =require("jimp");
const register = async (userData) => {
  const { name, email, password } = userData;

  
  const validationResult = registerSchema.validate({ name, email, password });
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ name, email, password: hashPassword ,avatarURL });
 

  return {
    email: newUser.email,
    subscription: "starter"
  };
};
  
  



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { error } = loginSchema.validate({ email, password });
      if (error) { 
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "24h",
      });
  
      res.json({
        token,
        user: {
          email: user.email,
          subscription: "starter" 
        },
      });
    } catch (err) {
      
      res.status(500).json({ message: "Server error" });
    }
  };
  



  const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Выход из системы прошел успешно" });
  };




const current = (req, res) => {
const {email, name} = req.user;
res.json(
  {email,
  name,}
)
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    const avatar = await Jimp.read(tempUpload);
    await avatar.cover(250, 250).writeAsync(tempUpload);

    const uniqueFilename = `${Date.now()}-${originalname}`;
    const resultUpload = path.join(avatarsDir, uniqueFilename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = `/avatars/${uniqueFilename}`;

    await User.findByIdAndUpdate(_id, { avatarURL });

    
    res.status(200).json({ avatarURL });
  } catch (err) {
    console.error(err);
   
    res.status(500).json({ message: 'Server error' });
  }
};

  module.exports = { register,
login, logout, current, updateAvatar};



