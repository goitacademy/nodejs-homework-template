const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const contactSchema = require("../../schemas")

const updateById = async (req, res) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw getError(400, "missing fields");
    } else {
      const { contactId } = req.params;
      const updatedContact = await contactsOperations.updateContact(contactId, req.body);
      if (!updatedContact) {
        throw getError(404, "Not found");
      } else {
        res.json(updatedContact);
      }
    }
}

module.exports = updateById