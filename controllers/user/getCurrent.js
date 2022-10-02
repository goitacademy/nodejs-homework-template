const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    status: "succes",
    code: 200,
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = getCurrent;
