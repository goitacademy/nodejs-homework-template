const { HttpError } = require("../../helpers");

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({ email, subscription });
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = current;
