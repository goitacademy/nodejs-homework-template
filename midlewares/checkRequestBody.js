const checkRequestBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  next();
};

module.exports = checkRequestBody;
