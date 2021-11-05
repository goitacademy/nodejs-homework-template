const Contact = require('../../model/contact')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params

  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing field favorite' })
    }

    const data = await Contact.findByIdAndUpdate(contactId, req.body)

    if (!data) {
      return res.status(404).json({ maessage: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: { data }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact
