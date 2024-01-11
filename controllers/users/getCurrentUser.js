const { HttpError } = require("../../helpers");

const getCurrentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    throw HttpError(401, "Unauthorized");
  }
};

module.exports = getCurrentUser;
