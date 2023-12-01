const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joiUserSchemas = require("../schemas/userSchemas");
const gravatar = require("gravatar");
const sendEmail = require("../helpers/sendEmail")
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Register User
async function register(req, res, next) {
  const { email, password, subscription } = req.body;
  console.log("Received data:", req.body);
  try {
    const validation = joiUserSchemas.validate({ email, password });

    if (validation.error) {
      console.log(
        "Validation error:",
        validation.error.details.map((error) => error.message).join(", ")
      );
      return res.status(400).send({
        message: validation.error.details
          .map((error) => error.message)
          .join(", "),
      });
    }

    const avatarURL = gravatar.url(email, { protocol: "http", s: "200" }); // генерируем аватар на основе email

    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      console.log("User already exists");
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // создаём уникальное поле при регистрации для верификации пользователя
    const verificationToken = crypto.randomUUID();

    //  отправка письма для подтвержения верификации пользователя
    await sendEmail({
      to: email,
      subject: "Welcome to the Contacts App!",
      html: `To confirm your email, please click <a href="http://localhost:3000/api/users/verify/${verificationToken}">Link</a>`,
      text: `To confirm your email, please open http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    const addUser = await User.create({
      email,
      password: passwordHash,
      subscription,
      avatarURL, // Сохраняем URL аватара в поле avatarURL
      verificationToken, // Сохраняем значение верификации
    });

    console.log("User registered successfully:", addUser);

    res.status(201).send({
      email: addUser.email,
      subscription: addUser.subscription,
      avatarURL: addUser.avatarURL,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    next(error);
  }
}

// Login User
async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const validation = joiUserSchemas.validate({ email, password });

    if (validation.error) {
      console.log(
        "Validation error:",
        validation.error.details.map((error) => error.message).join(", ")
      );
      return res.status(400).send({
        message: validation.error.details
          .map((error) => error.message)
          .join(", "),
      });
    }

    const user = await User.findOne({ email }).exec();

    if (user === null) {
      console.log("User not found");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password doesn't match");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    if (user.verify === false) {
      res
        .status(401)
        .send({ message: "You have not confirmed your e-mail address!" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    console.log("User logged in successfully");
    res.send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
}

// Log out user
async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null }).exec();

    if (!req.user._id) {
      res.status(404).send({ message: "Not authorized" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// Current user
async function current(req, res, next) {
  try {
    const user = await User.findOne().exec();

    if (!user) {
      return res.status(401).send({ message: "Not authorized" });
    }

    res
      .status(200)
      .send({ email: user.email, subscription: user.subscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token }).exec();

    if (user === null) {
      res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error)
  }
}

async function postVerify(req, res, next) {
  const { email } = req.body;

  try {
    // проверка на отсутвие электронной почты
     if (!email) {
       res.status(400).send({ message: "missing required field email" });
    }
    
    // проверка, верифицирован ли уже пользователь или нет
    const userVerifined = await User.findOne({ email }).exec();

    if (userVerifined && userVerifined.verify) {
       return res.status(400).send({ message: "Verification has already been successful" });
    }

    // создаём уникальное поле при регистрации для верификации пользователя
    const verificationToken = crypto.randomUUID();

    //  отправка письма для подтвержения верификации пользователя
    await sendEmail({
      to: email,
      subject: "Welcome to the Contacts App!",
      html: `To confirm your email, please click <a href="http://localhost:3000/api/users/verify/${verificationToken}">Link</a>`,
      text: `To confirm your email, please open http://localhost:3000/api/users/verify/${verificationToken}`,
    });

   res.status(200).send({message: "Verification Email Sent Successfully"});
  } catch (error) {
    
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
  verify,
  postVerify,
};
