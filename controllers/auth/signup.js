const { Conflict } = require("http-errors");
const { findUser, createUser } = require("../../services/auth");
const { hashPassword } = require("../../middlewares/passwordHash");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    const hashedPassword = hashPassword(password);

    if (user) {
      throw new Conflict(`Email in use`);
    }
    await createUser(email, hashedPassword);
    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
