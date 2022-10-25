const { Contact } = require('../../models/contacts');

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  return  res.status(201).json({
            status: "success",
            code: 201,
            result: newContact,
          })
}

module.exports = addContact;
