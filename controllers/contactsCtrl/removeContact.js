const { Contact } = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    return res.json({
            status: "error",
            code: 404,
            message: "Not found",
            })
  } else {
     return res.json({
            status: "success",
            code: 200,
            message: "Contact deleted",
            result: contact
            })
  }
}

module.exports = removeContact;