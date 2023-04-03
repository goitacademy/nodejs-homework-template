const getCurrent = (req, res, next) => {
  const { email, subscription, token, avatarUrl } = req.user;
  //   console.log(email, subscription);

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        avatarUrl,
        token
      },
    },
  });
};

module.exports = getCurrent;
