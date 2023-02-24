
const userCurrent = async (req, res, next) => {
    try {
      const user = req.user;
      const result = { email: user.email, subscription: user.subscription };
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = userCurrent