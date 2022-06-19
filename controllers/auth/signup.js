const { Conflict } = require("http-errors");
const { findUserByEmail, createUser } = require("../../services/users");
const { hashPassword } = require("../../middlewares/passwordHash");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
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
