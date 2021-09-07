const getUser = async (req, res) => {
  const { email, subscription } = req.user
  res.json({ email, subscription })
}

module.exports = getUser
