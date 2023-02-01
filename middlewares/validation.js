const { BadRequest, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const { User } = require('./../models/user');
const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw BadRequest(error.message);
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    throw Unauthorized('token type is not valid');
  }
  if (!token) {
    throw Unauthorized('no token provided');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw Unauthorized('jwt token is not valid');
    }
    throw error;
  }

  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1048576, // 1Mb
  },
});

module.exports = {
  validateBody,
  auth,
  upload,
};
