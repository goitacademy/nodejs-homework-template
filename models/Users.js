const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Contact } = require("./Schemas/Schema");
const { User, userSchema } = require("./Schemas/UsersSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require("passport-jwt");
require("./pass-config");
require("dotenv").config();
require("./pass-config");
const SECRET = process.env.SECRET;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
const signupUser = async (body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
      return { statusCode: 409, message: "Email in use" };
    }
    const { error } = userSchema.validate(body);

    if (error) {
      console.error(error.message);
      return { statusCode: 400, message: `Bad Reques. ${error.message} ` };
    }

    const createdUser = new User({ email, password });
    createdUser.setPass(password);
    await createdUser.save();
    return { statusCode: 201, message: createdUser };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: `Bad Reques` };
  }
};

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  const isSamePass = user.isSamePass(password);
  if (isSamePass) {
    const payload = {
      id: user.id,
      email: user.email,
      admin: false,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1w" });
    user.setToken(token);
    await user.save();
    return {
      statusCode: 200,
      message: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    };
  } else {
    return {
      statusCode: 401,
      message: "Email or pass is wrong",
    };
  }
};

const logOutUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

const addUserContact = async (user, contactToAdd) => {
  try {
    console.log(user, contactToAdd);

    const newContact = await Contact.create({
      owner: user._id,
      ...contactToAdd,
    });
    return { statusCode: 200, message: newContact };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 400,
      message: { message: "a required field is not ok" },
    };
  }
};

const getUserContacts = async (user) => {
  try {
    const userContacts = await Contact.find({ owner: user._id });
    return { statusCode: 200, message: userContacts };
  } catch (err) {
    return { statusCode: 401, message: err.message || "bad request" };
  }
};

module.exports = {
  signupUser,
  loginUser,
  auth,
  logOutUser,
  addUserContact,
  getUserContacts,
};
