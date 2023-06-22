const validationFavorite = (req, res, next) => {
  const { body } = req
  if (!body ||body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = validationFavorite;
