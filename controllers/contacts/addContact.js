const Contact = require('../../models/contactModel');
const { userDataValidator } = require('../../utils');

exports.addContact = async (req, res) => {
  try {
    const { error, value } = userDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    const newContact = await Contact.create(value);

    res.status(201).json(newContact);
  } catch (error) {
    res.sendStatus(500);
  }
};
