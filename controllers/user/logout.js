const { HttpError } = require("../../helpers/index");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log("_id :", _id);
  if (!_id) {
    throw HttpError(401, "Not authorized");
  }
  req.headers = {};
  console.log("req.headers :", req.headers);
  res.status(204).json();
};

module.exports = logout;
