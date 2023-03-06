require("dotenv").config();

const { User } = require("../../models");

const logout = async (request, response) => {
  const { _id } = request.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  response.status(204).json({
    message: "No content",
  });
};

module.exports = logout;
