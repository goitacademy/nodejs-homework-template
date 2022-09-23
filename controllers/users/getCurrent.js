const getCurrent = async (req, res) => {
  console.log(req.user);
  const { email } = req.user;
  res.json({
    email,
  });
};

module.exports = getCurrent;
