const { Contact } = require("../models");
const { HttpError, ctrlWrapper } = require("../helpers");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  };

  module.exports = ctrlWrapper(removeContact);