const { Contact } = require('../../models/contacts');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});

  if (!contact) {
    return res.status(404).json({
            status: "error",
            code: 404,
            message: "missing field favorite",
            })
  } else {
      return res.status(200).json({
                status: "success",
                code: 200,
                result: contact,
              })
      }
}

module.exports = updateStatusContact;