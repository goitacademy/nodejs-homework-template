const findContactAndRemove = require('../../services/contactsServices');

const delateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await findContactAndRemove(contactId);
    res.status(200).json({ message: 'Contact deleted', status: 'Succsess' });
  } catch (error) {
    next(error);
  }
};

module.exports = delateContact;
