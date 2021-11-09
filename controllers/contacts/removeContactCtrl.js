const Contact = require('../../models/contact')

const removeContactCtrl = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const data = await Contact.findByIdAndDelete(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContactCtrl
