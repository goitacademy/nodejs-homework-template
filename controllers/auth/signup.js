const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email in use`);
    }
    await User.create({ email, password });
    res.status(201).json({
      user: {
        email,
        password,
      },
    });
  } catch (error) {}
};

module.exports = signup;
