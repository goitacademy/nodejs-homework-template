const { Contact } = require('../model')

const contactUpdate = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
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
}

module.exports = contactUpdate
