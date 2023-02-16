const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    status: "Success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
