const { user: service } = require('../../services')

const updateSubscription = async (req, res, next) => {
  const {
    body,
    user: { _id: id },
  } = req
  try {
    const updatedUser = await service.updateById(id, body)

    res.status(200).json({
      status: 'Success',
      code: 200,
      data: {
        updatedUser,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateSubscription
