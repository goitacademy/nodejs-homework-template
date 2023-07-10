const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.status(200).json({
    email,
    name,
  });
};
module.exports = getCurrent;
