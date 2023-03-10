const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email,
    },
  });
};

module.exports = getCurrent;
