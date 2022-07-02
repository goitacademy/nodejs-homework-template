const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { repositoryUsers } = require('../repository');
const { SECRET_KEY } = process.env;

const verifyToken = token => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  try {
    const token = req.get('authorization')?.split(' ')[1];
    const isValidToken = verifyToken(token);
    if (!isValidToken) {
      throw new Unauthorized('Not authorized');
    }
    const { id } = jwt.decode(token);
    const userAuthorizationById = await repositoryUsers.findById(id);
    if (!userAuthorizationById || userAuthorizationById.token !== token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = userAuthorizationById;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = guard;
