// const { currentUser } = require('../models/authService');

const currentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
      user: {
        email,
        subscription,
      },
  });
};

module.exports = {
    currentController
}

