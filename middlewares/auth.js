const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas/user');

require('dotenv').config();
const secret = process.env.SECRET;

const authError = { status: 401, message: 'Unauthorized' };

const auth = async (req, res, next) => {
     const {authorization = ""} = req.headers;
     const [bearer, token] = authorization.split(' ');
  try {

    if(bearer !== 'Bearer' || !token) {
         next(authError);
    }
    
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);
    if (!user) {
      next(authError);
    }
    req.user = user;
    next();

  } catch (e) {
    next(e);
  }  
}


module.exports = {
    auth
};