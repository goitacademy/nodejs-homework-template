const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
const {authorization = ""} = req.headers;
const [bearer, token] = authorization.split(" ");



try {
if(bearer !== "Bearer") {
return res.status(401).json({ message: 'Not authorized' });
}

const {id} = jwt.verify(token, SECRET_KEY);
const user = await User.findById(id);

if(!user || !user.token) {
   return res.status(401).json({ message: 'Not authorized' });
}

req.user = user;
next();

} catch (error) {
if(error.message === "Invalid sugnature" ||
error.message === 'invalid token') {
   error.status = 401;
}
next(error);
}
}

module.exports = auth;