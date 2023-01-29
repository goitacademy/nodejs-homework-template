const { signUp } = require("../../servises/user");

const signUpController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await signUp(email, password);

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp: signUpController,
};
