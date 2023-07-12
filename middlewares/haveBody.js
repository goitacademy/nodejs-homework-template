
const haveBody = (req, res, next) => {
  const { name, email, phone, ...extraFields } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  } else if (Object.keys(extraFields).length > 0) {
    res.status(400).json({ message: "extra fields not allowed" });
  } else {
    next();
  }
};

module.exports = haveBody;