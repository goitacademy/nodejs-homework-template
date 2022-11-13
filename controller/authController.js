const { registration, login } = require("../services/authServices");
const { Conflict } = require("http-errors");

const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await registration(email, password);
    res.json({ RequestBody: { email, password } });
  } catch (e) {
    if (e.message.includes("duplicate key error collection")) {
      const err = new Error();
      err.status = 409;
      err.message = "Email in use";
      next(err);
    }
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.json({ status: "succes", token });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerController, loginController };
