async function logout(req, res, next) {
  return res.status(503).json({ message: "logout not work" });
}

module.exports = logout;
