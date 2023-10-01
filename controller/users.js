const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const gravatar = require("gravatar");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sgMail = require("@sendgrid/mail");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const secret = process.env.SECRET;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  findUserByEmail,
  findUserByToken,
  createUser,
  verifyUser,
} = require("../service");
const uploadDir = path.join(process.cwd(), "tmp");
const createPublic = path.join(process.cwd(), "public");
const storeImage = path.join(createPublic, "avatars");

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
});

const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const recheckUserSchema = Joi.object({
  email: Joi.string().email().required(),
});

const sendVerificationEmail = async (email, verificationToken) => {
  const tokenUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;

  const msg = {
    to: email,
    from: "szymon_o@mac.com",
    subject: "Please verify your email address",
    text: `Click the following link to verify your email: ${tokenUrl}`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userValidationResult = signUpSchema.validate({
      email,
      password,
    });

    if (userValidationResult.error) {
      return res
        .status(400)
        .json({ message: userValidationResult.error.message });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const url = gravatar.url(email, { s: "200" });
    const verificationToken = nanoid();

    const newUser = await createUser({
      email,
      password: hashedPassword,
      avatarURL: url,
      verificationToken,
    });

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({
      message: "User created",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    const userValidationResult = logInSchema.validate({
      email,
      password,
    });

    if (userValidationResult.error) {
      return res
        .status(400)
        .json({ message: userValidationResult.error.message });
    }

    if (!existingUser.validPassword(password)) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!existingUser.verify) {
      return res.status(401).json({ message: "Email is not verified" });
    }

    if (!existingUser.verify) {
      return res.status(401).json({ message: "Email is not verified" });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      subscription: existingUser.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    existingUser.token = token;
    await existingUser.save();

    return res.status(200).json({
      token,
      user: {
        email: existingUser.email,
        subscription: existingUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Not authorized",
        error: err,
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { user } = req;

    if (!id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    user.token = null;
    await user.save();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
  }
};

const current = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { email, subscription } = user;

    return res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const avatars = async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(uploadDir, originalname);
  const { token, email } = req.user;
  const { user } = req;
  const username = email.split("@")[0];
  const newAvatarPath = `${storeImage}/${username}.jpg`;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await fs.rename(temporaryName, fileName);
    const avatar = await Jimp.read(fileName);
    avatar.resize(250, 250).write(newAvatarPath);
    user.avatarURL = newAvatarPath;
    await user.save();
    const { avatarURL } = user;

    return res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(fileName);
    console.error(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const exisitingUser = await findUserByToken(verificationToken);
    if (!exisitingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await verifyUser({ verificationToken: verificationToken });

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error(error);
  }
};

const recheckUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userValidationResult = recheckUserSchema.validate({
      email,
    });

    if (userValidationResult.error) {
      return res
        .status(400)
        .json({ message: userValidationResult.error.message });
    }

    const existingUser = await findUserByEmail(email);
    const { verificationToken, verify } = existingUser;

    if (existingUser && verify === true) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(email, verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  signup,
  login,
  auth,
  logout,
  current,
  avatars,
  upload,
  uploadDir,
  storeImage,
  createPublic,
  verify,
  recheckUser,
};
