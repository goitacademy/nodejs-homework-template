const fs = require('fs/promises');
const { contactsValiadation } = require('../../valiadators/joiValiadator');
const Contact = require('../../models/contacts/contacts');

const updateContact = async (req, res) => {
  try {
    const { error, value } = contactsValiadation(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
    const item = await Contact.findOneAndUpdate({name: req.body.name, email: req.body.email, phone: req.body.phone, favorite: req.body.favorite });
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(201).json({ message: 'Contact is updated', item });
  }
  catch (err) {
    res.status(400).json({ message: 'Ooops...',})
  }
}

module.exports = {
  updateContact
}