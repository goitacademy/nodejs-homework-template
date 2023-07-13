const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
