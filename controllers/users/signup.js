const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`"Email ${email} in use"`);
  }
};
module.exports = signup;
