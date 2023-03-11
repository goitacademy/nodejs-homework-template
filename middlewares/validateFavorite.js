const validateFavorite = (req, res, next) => {
    if (!req.body || !req.body.favorite) {
        return res.status(400).json({ message: "missing field favorite" })
      }
      next()
}

module.exports = validateFavorite