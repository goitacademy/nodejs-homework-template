const getCurrent = async (req, res, next) => {
  try {
    const { name, email, subscription } = req.user;
    res.json({
      name,
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
