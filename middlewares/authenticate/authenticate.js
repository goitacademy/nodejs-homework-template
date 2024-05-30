const { httpErrorFunc } = require('../../helpers/index');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpErrorFunc(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    console.log(user);
    if (!user || !user.token || user.token !== token) {
      next(httpErrorFunc(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch {
    next(httpErrorFunc(401, 'Not authorized'));
  }
};

module.exports = authenticate;
