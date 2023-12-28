const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
    subscription: "starter",
  });
};

module.exports = getCurrent;
