const { Contact } = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

  if (!contact) {
    return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            })
  } else {
      return res.status(200).json({
                status: "success",
                code: 200,
                result: contact,
              })
      } 
}

module.exports = updateContact;