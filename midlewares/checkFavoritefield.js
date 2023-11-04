const checkFavoriteField = (req, res, next) => {
  if (!("favorite" in req.body)) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = checkFavoriteField;
