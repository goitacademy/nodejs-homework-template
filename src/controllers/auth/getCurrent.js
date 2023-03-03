const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  console.log(req.user);
  res.status(200).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = { getCurrent };
