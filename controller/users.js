const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const storeImage = path.join(process.cwd(), "tmp");
const storeResizedImage = path.join(process.cwd(), "public", "avatars");
const jimp = require("jimp");
const { sendVerificationEmail } = require("../auth/config/config-nodemailer");
const { v4: uuidv4 } = require("uuid");

const secret = "goit";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 401,
      data: "Bad request",
      message: "Incorrect login/password",
    });
  }
  if (user.verify === false) {
    return res.status(400).send("verify your email");
  }
  try {
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    user.save();

    return res.json({
      status: "success",
      code: 200,
      data: { token },
    });
  } catch (e) {
    return res.json.status(400).send(e.message);
  }
};
const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = new User({ username, email, avatarURL });
    newUser.verificationToken = verificationToken;
    newUser.setPassword(password);

    const payload = {
      id: newUser.id,
    };
    newUser.token = jwt.sign(payload, secret, { expiresIn: "1h" });
    await newUser.save();

    sendVerificationEmail(email, verificationToken);

    return res.json({
      status: "success",
      code: 201,
      data: {
        message: "Register completed",
      },
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const logout = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    req.user = user;
    const { id } = req.user;
    const currentUser = await User.findOne({ _id: id });

    currentUser.token = null;
    await currentUser.save();
    try {
      await currentUser.save();
      return res.json({
        status: "success",
        code: 204,
      });
    } catch (e) {
      return res.status(401).send(e.message);
    }
  })(req, res, next);
};

const getCurrent = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    req.user = user;
    const { id } = req.user;

    const currentUser = await User.findOne({ _id: id });

    if (currentUser.token === null) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    currentUser.token = req.token;
    await currentUser.save();
    res.json({
      status: "success",
      code: "200",
      data: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    });
  })(req, res, next);
};

const changeAvatar = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }
    req.user = user;
    const { id } = req.user;

    const currentUser = await User.findOne({ _id: id });

    const { description } = req.body;
    const { path: tempPathName, originalname, filename, mimetype } = req.file;
    const filePath = path.join(storeImage, filename);
    const resizedFilePath = path.join(storeResizedImage, filename);

    try {
      await fs.rename(tempPathName, filePath);
      const image = await jimp.read(filePath);
      await image.resize(250, 250).write(resizedFilePath);
      currentUser.avatarURL = `http://localhost:3000/avatars/${filename}`;
      await currentUser.save();
    } catch (e) {
      console.log(e.message);
    }

    res.json({
      description,
      message: "Image uploaded",
      status: 200,
    });
  })(req, res, next);
};

const verify = async (req, res, next) => {
  const verificationToken = req.params.verificationToken.substring(1);

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      { verify: true }
    );
    if (user) {
      user.verify = true;
      return res.status(200).send("Verification successful");
    } else {
      return res.status(404).send("User not found.");
    }
  } catch (e) {
    console.log(e.message);
  }
};

const resendVerification = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!email) {
      return res.status(400).send("missing required field email");
    }
    if (user.verify === true) {
      return res.status(400).send("Verification has already been passed");
    } else {
      const verificationToken = user.verificationToken;
      sendVerificationEmail(email, verificationToken);
      return res.status(200).send("Verification email sent");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  login,
  register,
  logout,
  getCurrent,
  changeAvatar,
  verify,
  resendVerification,
};
