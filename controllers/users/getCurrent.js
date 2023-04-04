const getCurrent = (req, res, next) => {
  const { email, subscription, token } = req.user;
  
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        token
      },
    },
  });
};

module.exports = getCurrent;