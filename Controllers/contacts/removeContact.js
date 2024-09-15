const { UpsErrors, ctrlWraper } = require("../../Helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw UpsErrors(404, "Error deleting the Contact");
    }
    res.json({ message: "Huray! its deleted" });
  };

  module.exports = ctrlWraper(removeContact);