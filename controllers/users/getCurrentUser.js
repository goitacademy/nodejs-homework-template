const getCurrentUser = async (req, res, next) => {
  const { email, token, subscription } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    token,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrentUser;
