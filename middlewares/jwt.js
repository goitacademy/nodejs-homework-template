const passport = require('passport');

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt",{session: false}, (err,user) => {
    if(!user || err) {res.json({message: "Unauthorized", status: "failed", code: 401})};
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authMiddleware
