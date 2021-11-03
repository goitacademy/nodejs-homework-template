const { updateContact } = require('../../model/contacts')
const { joiContactsShcemaUpd } = require('../../validation/contactSchema')

const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const { error } = joiContactsShcemaUpd.validate(req.body)
  if (error) { return res.status(400).json({ message: error.message }) }

  try {
    const data = await updateContact(contactId, req.body)

    if (!data) {
      return res.status(404).json({ maessage: 'Not found' })
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
