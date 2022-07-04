const getCurrent = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.json({
      email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
