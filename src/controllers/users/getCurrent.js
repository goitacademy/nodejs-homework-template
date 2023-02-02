// const {User} = require("../../models");

const getCurrent = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { email, subscription } = req.user;

    res.json({
      status: "success",
      code: 200,
      user: { email: email, subscription: subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
