async function getCurrent(req, res) {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: { email, subscription },
    },
  });
}

module.exports = getCurrent;
