const { basedir } = global;

const createError = require(`${basedir}/helpers/createError`);

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { User } = require(`${basedir}/models/user`);

const auth = async (req, res, next) => {
  const { authorization = ' ' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(createError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      console.log(5);
      next(createError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    
    next(createError(401, error.massage));
  }
};
module.exports = auth;
