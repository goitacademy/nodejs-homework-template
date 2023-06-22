const getCurrent = async (req, res) => {
  const { email } = req.user;
  console.log(email);

  res.json({
    email,
  });
};

module.exports = getCurrent;
