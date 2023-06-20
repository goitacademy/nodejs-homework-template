const Contact = require("../../models/contact");

const { HttpError, ctrlWrappers } = require("../../helpers");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById({_id: contactId });
    if (!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result)
}

module.exports = {getById: ctrlWrappers(getById)}