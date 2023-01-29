const { logIn } = require("../../servises/user");

const logInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, subscription } = await logIn(email, password);
    console.log(token);

    res.status(200).json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  logIn: logInController,
};
