const getCurrent = async (req, res, next) => {
  try {
    const { name, email } = req.user;
    res.json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
