const { User } = require("../../models");

const logout = async (requirement, response) => {
  const { _id } = requirement.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  response.status(204).json();
};

module.exports = logout;
