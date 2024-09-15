const { UpsErrors, schemas, ctrlWraper } = require("../../Helpers");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
    const { error } = schemas.validate(req.body);
    if (error) {
      throw UpsErrors(404, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw UpsErrors(404, "Not found");
    }
    res.json(result);
  };

  module.exports = ctrlWraper(updateContact);