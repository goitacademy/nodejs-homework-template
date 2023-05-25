const { HttpError } = require("../../helpers/index");

const logout = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpError(401, "Not authorized");
  }
  req.headers = {};
  res.status(204).json();
};

module.exports = logout;
