const HTTP_CODES = require("../../../../helpers/httpStatusCodes");
const User = require("../../models/schemas/userSchema");

const logout = async (req, res) => {
  const user = req.user;
  try {
    await User.findOneAndUpdate({ _id: user.id }, { token: null });
    res.status(HTTP_CODES.OK).json("User is logouted");
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = logout;
