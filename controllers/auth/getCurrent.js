const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    res.json({
      email,
      subscription,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
