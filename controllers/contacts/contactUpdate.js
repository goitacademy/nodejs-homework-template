const { Contact } = require('../../models')

const contactUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    const auth = JSON.stringify(result.owner) === JSON.stringify(req.user._id)
    if (!auth) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
      })
      return
    }
    if (!result) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field',
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = contactUpdate
