const service = require("../service/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const { validateUser, validateSubscription, validateResend} = require("../tools/userValidator");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const sendMail = require("../tools/sendGrid");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.findUserByEmail({ email });
  const { error } = await validateUser({ email, password });
  if (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Missing fields" });
  }

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      msg: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = await service.signUpNewUser(email, password);
    res.json({
      status: 201,
      msg: "Create new user",
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
        verificationToken: newUser.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = await validateUser({ email, password });
  try {
    if (error) {
      console.log(error);
      return res.json({ status: 400, msg: "Missing fields" });
    }
    const user = await service.findUserByEmail({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        msg: "Email or password is wrong",
        data: "Bad request",
      });
    }

    if (!user.verify) {
      return res.status(401).json({ message: "Email has not been verified" });
    };

    const payload = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await service.findUserByIdAndUpdate(user.id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
        verificationToken: user.verificationToken,
        id: user.id,
        verify: user.verify,
      },
      msg: `Login successful. ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const { id } = req.user;
  try {
    await service.findUserByIdAndUpdate(id, { token: null });
    res.status(204).json({ status: "No content" });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  const { email, subscription, verificationToken } = req.user;
  try {
    res.status(200).json({
      status: "OK",
      body: { email, subscription, verificationToken },
    });
  } catch (error) {
    next(error);
  }
};

const changeSubscription = async (req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const { error } = await validateSubscription({subscription});
  
  try {
    if (error) {
      console.log(error);
      return res.json({ status: 400, msg: "Missing fields" });
    }    
    const changeSub = await service.setSubscription(id, {subscription})
    res.json({ status: 200, msg: "Change subscription", data: changeSub });
  } catch (error) {
    next(error);
  }
}

const avatar = async (req, res, next) => {
  const storeImage = path.join(process.cwd(), "public/avatars");
  const { id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const ext = path.extname(originalname);
  const newName = `pic_${id}${ext}`;
  const newAvatarURL = `/avatars/${newName}`;
  const fileName = path.join(storeImage, newName);

  try {
    await fs.rename(temporaryName, fileName);
    await Jimp.read(fileName)
      .then((avatar) => {
        return avatar.resize(250, 250).write(fileName);
      })
      .catch((err) => {
        console.error(err);
      });
    await service.updateAvatar(id, newAvatarURL);
    return res.status(200).json({
      msg: "Set new avatar",      
      avatarURL: newAvatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const emailVerification = async(req, res, next) => {
  const { verificationToken } = req.params;  
  try {
    const user = await service.updateVerificationToken(verificationToken);
    if (user) {
      return res.status(200).json({ msg: "Verification successful" });
    } else {
        return res.status(404).json({ msg: "User not found" });
    }
  } catch (error){
    next(error);
  }
};

const resendEmailVerification = async(req, res, next) => {
  const { email } = req.body;
  const { error } = await validateResend({ email });
  if (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Missing fields" });
  }
  try {
    const user = await service.findUserByEmail({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    
    } else if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    
    } else {
      await sendMail(email, user.verificationToken);
      return res.status(200).json({ message: "Verification email sent" });
    }   

  } catch (error){
    next(error);
  }
}

module.exports = {
  signUp,
  logIn,
  logOut,
  current,
  changeSubscription,
  avatar,
  emailVerification,
  resendEmailVerification
};
