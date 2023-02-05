const jwt = require('jsonwebtoken');
const { HttpError } = require('@root/helpers');
const { UserModel } = require('@root/models');
const { SECRET_KEY } = process.env;

const validateJwtToken = async (req, res, next) => {
  const { authorization: authString } = req.headers;
  const [tokenType, token] = authString?.split(' ') ?? [];

  // validate request string
  if (!authString || tokenType !== 'Bearer') return next(new HttpError(400));

  // validate token
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return next(new HttpError(401));
  }

  // get user
  const { _id: id } = jwt.decode(token);
  const userWithToken = await UserModel.findById(id);
  if (!userWithToken) return next(new HttpError(401));

  // save user`s info and process further
  req.user = { id };
  next();
};

module.exports = validateJwtToken;
