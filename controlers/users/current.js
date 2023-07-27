const current = async (req, res, next) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

module.exports = current;
