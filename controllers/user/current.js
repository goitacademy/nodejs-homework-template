const { HttpError } = require("../../helpers");

async function current(req, res) {
  const { user } = req;

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  const { email, subscription } = user;
  return res.status(200).json({
    email,
    subscription,
  });
}

module.exports = current;
