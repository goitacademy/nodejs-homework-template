const User = require("../../models/schemas/userSchema");
const jwt = require("jsonwebtoken");
const HTTP_CODES = require("../../../../helpers/httpStatusCodes");

const current = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const user = jwt.decode(token);
    const existingUser = await User.findOne({ token });
    if (!existingUser.token) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ error: "Not authorized" });
    }

    const { email, id } = user;

    return res.status(HTTP_CODES.OK).json({
      status: "error",
      code: HTTP_CODES.OK,
      data: {
        email,
        id,
      },
    });
  } catch (error) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = current;
