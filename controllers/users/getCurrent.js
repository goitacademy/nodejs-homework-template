const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    email: email,
    subscription: "starter",
  });
};

module.exports = getCurrent;
