const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/httpError');
const { User } = require('../models/user');

const multer = require('multer');
const path = require('path');

const { JWT_SECRET } = process.env;

async function authorization(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    throw new HttpError(401, 'Token type must be Bearer');
  }
  if (!token) {
    throw new HttpError(401, 'No token provided');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new HttpError(401, 'jwt token is expired');
    }
    throw new HttpError(401, error.message);
  }

  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage,
});

module.exports = {
  authorization,
  upload,
};
