const jwt = require('jsonwebtoken');
const { auth } = require('../model');
const { User } = auth;
const { SECRET_KEY } = process.env;

const setErrorMessage = res => {
  res.status(401).json({
    status: 'error',
    code: 401,
    message: 'Not authorized',
  });
};

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    setErrorMessage(res);
    return;
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    setErrorMessage(res);
    return;
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id });

    if (!user.token) {
      setErrorMessage(res);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    setErrorMessage(res);
  }
};

module.exports = authenticate;
