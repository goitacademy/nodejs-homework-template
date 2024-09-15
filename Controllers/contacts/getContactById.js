const { UpsErrors, ctrlWraper } = require("../../Helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw UpsErrors(404, "Not found");
    }
    res.json(result);
  };

module.exports = ctrlWraper(getContactById);