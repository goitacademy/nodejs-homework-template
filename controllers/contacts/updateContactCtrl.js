const Contact = require('../../models/contact')

const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields' })
  }

  try {
    const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })

    if (!data) {
      return res.status(404).json({ maessage: 'form updCtr Not found' })
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

module.exports = updateContactCtrl
