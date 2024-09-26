const { User, authSchemas } = require("../models");
const {resizeAvatar} = require("../middlewares")
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
// const fs = require("fs/promises")
const gravatar = require("gravatar");
const avatarDir = path.join(__dirname,"../","public","avatars");

const {nanoid} = require("nanoid");

const { SECRET_KEY,BASE_URL } = process.env;

const { RequestError,sendEmail } = require("../helpers");







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
    const avatarURL =  gravatar.url(email);
    const verificationToken = nanoid();
   
     
  
    const newUser = await User.create({
       ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
       });

       const verifyEmail = {
to: email,
subject: "Verify email",
html: `<a target="_blank"
 href="${BASE_URL}/users/verify/${verificationToken}"
 >Click to verify email</a>`
       }

       await sendEmail(verifyEmail)

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};


const verifyEmail = async (req, res, next) => {
  try {
    const{verificationToken} = req.params;
    const user = await User.findOne({verificationToken})
   
    if (!user) {
      throw RequestError(404, 'User not found');
    }
    
    await User.findByIdAndUpdate(user._id,{verify:true,verificationToken:""});

  } catch (error) {
    next(error);
  }
  return res.status(200).json({ message: 'Verification successful' });

}


const resendVerifyEmail = async (req,res,next) => {
  try {
    const { error } = authSchemas.emailSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required field email");
    }
    const { email } = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
      throw RequestError(401, "Email not found");
    }
    if (user.verify) {
      throw RequestError(400, "Verification has already been passed");
    }
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank"
       href="${BASE_URL}/users/verify/${user.verificationToken}"
       >Click to verify email</a>`
             }

             await sendEmail(verifyEmail)

  } catch (error) {
    next(error)
  }
  res.status(200).json({ message: 'Verification email sent' });
}



const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(401, " Email or password is wrong");
    }

    if (!user.verify) {
      throw RequestError(404, 'User not verified');
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
  if (!req.file) return res.status(400).json({ message: "Please upload a file" }); 
  const {_id} = req.user
  const {path:tempUpload,originalname} = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir,fileName);
  await resizeAvatar(tempUpload,resultUpload)
  // await fs.rename(tempUpload,resultUpload);
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
  verifyEmail,
  resendVerifyEmail,
};
