const { signup, login } = require("../servises/authService");

const ctrlSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await signup(name, email, password);

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);

  res.json({ status: "success", token });
};

module.exports = {
  ctrlSignup,
  ctrlLogin,
};
