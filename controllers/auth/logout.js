const { HttpError } = require("../../helpers");

const logout = (req, res) => {
  const { user } = req;
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  req.headers.authorization = "";
  res.status(204).json();
};

module.exports = logout;
