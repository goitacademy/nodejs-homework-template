const Contact = require('../../model/contact.model')
const ERROR_MESSAGES = require('../../const/const')

const addContact = async (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  try {
    const newContact = new Contact({ name, email, phone })
    const updateContact = await newContact.save()

    res.status(201).json({
      new_contact: updateContact,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact
