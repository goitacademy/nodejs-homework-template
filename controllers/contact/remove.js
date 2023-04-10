const Contacts = require('../../models/contact/contactsSchema')

const remove = async (req, res, next) => {
  try {
     const { contactId } = req.params;

    await Contacts.findByIdAndDelete(contactId);

  res.status(200).json({"message": "contact deleted"});
  } catch (err) {
     next(err);
  }
}

module.exports = remove;