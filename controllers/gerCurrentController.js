const { currentUser } = require('../models/authService');

const currentController = async (req, res) => {
currentUser
    res.status(200).json({
        data: {
            user: {
                email,
                subscription: "starter",
            },
        },
  });
};

module.exports = {
    currentController
}