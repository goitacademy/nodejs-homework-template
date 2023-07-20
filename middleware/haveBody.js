const haveBody = (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (req.method === "PUT" && !name && !email && !phone && !favorite) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (req.method === "PATCH" && !name && !email && !phone && !favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = haveBody;
