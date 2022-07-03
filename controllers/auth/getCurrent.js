const getCurrent = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.json({
      email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getCurrent;
