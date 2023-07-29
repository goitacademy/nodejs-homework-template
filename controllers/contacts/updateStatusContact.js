const {Contact} = require("../../models/contact")

const {HttpError, ControllerWrapper} = require("../../utils/index");

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if(!result) {
    throw HttpError(404, "Not found. Contact with such id doesn't exist");
  };
  res.json(result);
};

module.exports = ControllerWrapper(updateStatusContact);