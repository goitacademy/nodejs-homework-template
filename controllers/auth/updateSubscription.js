/* eslint-disable no-tabs */
const { NotFound } = require('http-errors')
const { User } = require('../../models')

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user
    const updatedContact = await User.findByIdAndUpdate(_id, req.body, { new: true })
		if (!updatedContact) {
			throw new NotFound(`Product with id=${_id} was not found`)
	}
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        updatedContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateSubscription
