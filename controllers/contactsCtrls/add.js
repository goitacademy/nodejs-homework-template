const data = require('../../contactsData');
const { contactSchema } = require('../../validation');

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.message       
      })
    }

    const newContact = await data.addContact(req.body);

    res.status(201).json({
      newContact
    })
  }

  catch (error) {
    next(error)
  }
}

module.exports = addContact;