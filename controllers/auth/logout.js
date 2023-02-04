const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) {
    res.status(401).json({
      status: "unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }

  res.status(204).json();
};

module.exports = logout;
