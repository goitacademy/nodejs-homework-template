const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  console.log(name, email);
  res.json({
    email,
    name,
  });
};

module.exports = getCurrent;
