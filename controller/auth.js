const authService = require('../services/auth');

const signup = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
      status: 'success',
      code: 201,
      data: {
          message: 'Registration successful',
          user: {
                email: user.email,
              subscription: user.subscription,
            verificationToken: user.verificationToken
          }
      },
    });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const token = await authService.loginUser(req.body);
      
        res.json({
        status: 'success',
        code: 200,
        data: {
            token
    },
  });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await authService.logoutUser(req.user._id);
       res.json({
        status: 'success',
        code: 204,
  });
    } catch (e) {
        next(e);
    }
}



module.exports = {
    signup, login, logout
}