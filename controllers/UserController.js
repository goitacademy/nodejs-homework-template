const {
  registration,
  login,
  logout,
  current,
  subscriptionUpdate,
} = require("../service/index");

class AuthControllers {
  singup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const result = await registration(email, password);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  singin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const result = await login(email, password);

      res.status(201).json({
        token: result,
        user: {
          email,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      await logout(authorization);

      res.status(204).json({
        status: "No content",
        code: "204",
      });
    } catch (e) {
      next(e);
    }
  };

  current = async (req, res, next) => {
    const { email, subscription } = req.user;
    try {
      res.json({
        status: "sucess",
        code: 200,
        data: {
          user: {
            email,
            subscription,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  };

  subscriptionUpdate = async (req, res, next) => {
    const id = req.user._id;
    const { subscription } = req.body;
    try {
      const user = await subscriptionUpdate(id, subscription);

      res.json({
        status: "Success",
        data: {
          user,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new AuthControllers();
