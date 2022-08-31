const current = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
    subscription: "starter",
  });
};

module.exports = current;
