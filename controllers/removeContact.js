const {Contact} = require("../../models/contact")

const {HttpError, ControllerWrapper} = require("../../utils/index");

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if(!result) {
    throw HttpError(404, "Not found. Contact with such id didn't exist");
  };
  res.json({"message": "contact deleted"});
};


module.exports = ControllerWrapper(removeContact);