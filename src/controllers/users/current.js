async function current(req, res, next) {
  return res.status(503).json({ message: "current not work" });
}

module.exports = current;
