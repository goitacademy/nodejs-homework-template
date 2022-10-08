const getCurrent = async (req, res) => {
  const { username, email } = req.user
  res.json({
    username,
    email,
  })
}

module.exports = getCurrent