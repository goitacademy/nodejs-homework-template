const isEmptyBody = (req, res, next) => {
     if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
}

module.exports = isEmptyBody;