const { HttpError } = require("../../helpers");
// const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  const { authorization: Authorization = "" } = req.headers;

  if (!Authorization) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
