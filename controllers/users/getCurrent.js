const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
