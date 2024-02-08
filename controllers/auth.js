const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const HttpError = require("../helpers/HttpError.js");
const { User } = require("../models/user");
const sendEmail = require("../helpers/sendEmail.js");

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    const verifyToken = crypto.randomUUID();
    console.log(verifyToken)
    await sendEmail({
      to: email,
      from: "nedavnayaya.yana@gmail.com",
      subject: "Welcome to ContactsBook",
      html: `To confirm your registration please click on the <a href="http://localhost:3000/api/users/verify/${verifyToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verifyToken}`,
    });
    await User.create({ email, verificationToken: verifyToken, password: passwordHash, avatar });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      console.log("Email");
      throw HttpError(401, "Email or password is wrong");
   
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      throw HttpError(401, "Email or password is wrong");
 
    }
    if (user.verify === false) {
      return res.status(401).send({ message: "Your account is not verified" });
    }
    const token = jwt.sign(
      { id: user._id, name: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 } // "1h"
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).send({ message: 'No content'});
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  
  try {
    
    const authHeader = req.headers.authorization;
 
  if (typeof authHeader === "undefined") {
    throw HttpError(401, "Not authorized");
    // return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
    // return res.status(401).send({ message: "Not authorized" });
  }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw HttpError(401, "Not authorized");
      // return res.status(401).send({ message: "Not authorized" });
    }

    const user = await User.findById(decode.id);
   
    if (user === null) {
      throw HttpError(401, "Not authorized");
      // return res.status(401).send({ message: "Not authorized" });
    }

    if (user.token !== token) {
      throw HttpError(401, "Not authorized");
      // return res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send({ "email": user.email });
    })
   } catch (error) {
    next(error);
  }
}
async function verify(req, res, next) {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  console.log(user.verificationToken)
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = { register, login, logout, current, verify, resendVerifyEmail };