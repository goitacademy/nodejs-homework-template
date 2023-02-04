const getCurrent = async (req, res) => {
  console.log(req.user);
  const { email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
