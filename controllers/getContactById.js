const {Contact} = require("../../models/contact")

const {HttpError, ControllerWrapper} = require("../../utils/index");

const getContactById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if(!result) {
    throw HttpError(404, "Not found. Contact with such id doesn't exist");
  }
  res.json(result);
};


module.exports = ControllerWrapper(getContactById);