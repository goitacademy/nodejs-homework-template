const currentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user
    res.json({
      status: 'success',
      code: 200,
      data: { email, subscription }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = currentUser
