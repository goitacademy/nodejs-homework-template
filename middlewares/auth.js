const { User, schemaLogin, registerSchema, subscriptionSchema } = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const userErr = new Error();
    userErr.status = 409;
    userErr.message = `Email in use`;
    next(userErr);
  }
  next();
};

const login = async (req, res, next) => {
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error();
    err.status = 401;
    err.message = `Unauthorize`;
    next(err);
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    const err = new Error();
    err.status = 401;
    err.message = `Email or password is wrong`;
    next(err);
  }

  const { _id } = user;
  req.userId = _id;
  next();
};

const id = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const error = new Error();
    error.status = 404;
    error.message = `${contactId} not valid id format`;
    next(error);
  }

  next();
};

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    const err = new Error();
    err.status = 401;
    err.message = 'Not authorized';
    next(err);
  }

  try {
    const { id: tokenID } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(tokenID);

    if (!user || !user.token || user.token !== token) {
      const err = new Error();
      err.status = 401;
      err.message = `Not authorized`;
      next(err);
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === 'Invalid signature' || error.message === 'jwt malformed') {
      error.status = 401;
      error.message = 'Invalid token';
    }
    next(error);
  }
};

const subscription = (req, res, next) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = { auth, id, register, login, subscription };
