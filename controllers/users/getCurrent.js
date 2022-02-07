const successRes = require("../../utils/successRes");

async function getCurrent(req, res, next) {
  const { email, subscription } = req.user;

  try {
    res.json(
      successRes({
        email,
        subscription,
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = getCurrent;
