const isEmptyFavorites = (req, res, next) => {
     if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    next();
}

module.exports = isEmptyFavorites;