import passport from 'passport';

const auth = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!req.get('Authorization')) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
        data: 'Unauthorized',
      });
    }

    const token = req.get('Authorization').replace('Bearer ', '');

    if (!user || err || !token || token !== user.token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
        data: 'Unauthorized',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
