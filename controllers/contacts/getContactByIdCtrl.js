const Contact = require('../../models/contact')

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const data = await Contact.findById(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: { data },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactByIdCtrl
