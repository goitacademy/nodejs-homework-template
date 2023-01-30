const { HttpError } = require("../helpers/index");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/user");

const multer = require("multer");
const path = require("path");

// const sgMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY, USER_EMAIL } = process.env;

const jwt = require("jsonwebtoken");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  const [type, token] = authHeader.split(" ");

  if (type != "Bearer") {
    throw Unauthorized("Not authorized");
  }
  if (!token) {
    throw Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebToken") {
      throw Unauthorized("Not authorized");
    }
    throw error;
  }

  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
});

// sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: USER_EMAIL, // Change to your recipient
//   from: USER_EMAIL, // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = {
  validateBody,
  upload,
  // msg,
  auth,
};
