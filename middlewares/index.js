const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const { JWT_SECRET } = process.env;

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
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    throw HttpError(401, 'token type is nod valid.');
  }

  if (!token) {
    throw HttpError(401, 'no token provided');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw HttpError(401, 'Not found');
    }
    req.user = user;
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      throw HttpError(401, 'jwt token is not valid');
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

const upload = multer({ storage });

function resize(w, h) {
  return async (req, res, next) => {
    const { path } = req.file;
    const image = await Jimp.read(path);
    await image.resize(w, h);
    await image.writeAsync(path);

    next();
  };
}

module.exports = {
  validateBody,
  auth,
  upload,
  resize,
};
