async function getCurrent(req, res, next) {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCurrent };
