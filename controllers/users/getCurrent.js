const successRes = require("../../utils/successRes");

async function getCurrent(req, res, next) {
  const { email, subscription, avatarURL } = req.user;

  try {
    res.json(
      successRes({
        email,
        subscription,
        avatarURL,
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = getCurrent;
