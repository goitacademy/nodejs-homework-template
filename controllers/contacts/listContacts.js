const Contact = require('../../models/contactModel');

exports.listContacts = async (_, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.sendStatus(500);
  }
};
