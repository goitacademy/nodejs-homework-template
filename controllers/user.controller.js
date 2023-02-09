async function current(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
}

module.exports = {
  current,
};
