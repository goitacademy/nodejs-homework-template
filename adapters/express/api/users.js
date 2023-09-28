const userService = require("../../../services/users");
const createError = require("../../../untils/createError");
const ERROR_TYPES = require("../contastants/errorTypes");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const passport = require("../../../auth/index");
const { JWT_SECRET } = require("../../../constants/env");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../../untils/sendEmail");
const avatarDir = path.join(__dirname, "../../../", "public", "avatars");
const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const avatar = gravatar.url(email, {}, true);
    const passwordHash = await bcrypt.hash(body.password, 10);
    const verificationToken = nanoid();
    const checkEmail = await userService.findUser({ email });
    if (Object.keys(checkEmail).length) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: `CONFLICT`,
      });
      throw error;
    }
    const user = await userService.registerUser({
      ...body,
      password: passwordHash,
      avatarURL: avatar,
      verificationToken,
    });
    const varifyEmail = {
      to: email,
      subject: "verify email",
      html: `<a href="http://localhost:3000/api/user//users/verify/${verificationToken}">Click for verify email</a>`,
    };
    await sendEmail(varifyEmail);

    res.status(200).json({
      message: "user created",
    });
  } catch (e) {
    next(e);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { password, email } = body;
    const [user] = await userService.findUser({ email });
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!user) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "User with given email not found",
      });
      throw error;
    }
    if (!isValid) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: `Email or password is wrong`,
      });
      throw error;
    }
    const serializedUser = user;
    delete serializedUser.password;
    const token = jwt.sign(
      { sub: serializedUser._id, role: serializedUser.role },
      JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.cookie("jwt", token, { secure: true });
    res.status(200).json({
      data: {
        token,
        user,
      },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};
const currentUser = async (req, res, next) => {
  try {
    let user = req.user;
    if (!user) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: "Not authorized",
      });
      throw error;
    }
    const { email, subscription } = user[0];
    res.status(200).json({
      data: {
        email,
        subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user[0];
    const { path: teamUpload, originalname } = req.file;
    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(teamUpload, resultUpload);
    const avatarUrl = path.join("avatars", originalname);
    const user = await userService.updateByUserAvatar(_id, avatarUrl);
    res.status(200).json({
      data: avatarUrl,
    });
  } catch (e) {
    next(e);
  }
};
const verificationUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const [user] = await userService.findUser({ verificationToken });
    if (!user) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "User not found",
      });
      throw error;
    }
    const { _id } = user;
    const updateUser = await userService.updateVarify(_id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (e) {
    next(e);
  }
};
const verificationRepet = async (req,res,next) => {
  try{
    const {email} = req.body
    if(!email){
      const error = createError(ERROR_TYPES.BAD_REQUEST,{
        message:"missing required field email"
      })
      throw error
    }
    const [user] = await userService.findUser({email})
    const {verificationToken,verify} = user
    if(verify){
      const error = createError(ERROR_TYPES.BAD_REQUEST,{
        message:"Verification has already been passed"
      })
      throw error
    }
    const varifyEmail = {
      to: email,
      subject: "verify email",
      html: `<a href="http://localhost:3000/api/user//users/verify/${verificationToken}">Click for verify email</a>`,
    };
    await sendEmail(varifyEmail);
    res.status(200).json({
      message: "Verification email sent",
    });
  }catch(e){
    next(e)
  }
}
module.exports = {
  registerUser,
  loginUser,
  logout,
  currentUser,
  updateAvatar,
  verificationUser,
  verificationRepet,
};
