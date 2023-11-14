function register(req, res, next) {
  const { email, password } = req.body;
  console.log({ email, password });
  res.send("Register");
}

module.exports = { register };
