const getCurent = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  res.status(200).json({ email: user.email, subscription: user.subscription });
  next();
};

module.exports = { getCurent };
