const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const updateById = async (req, res) => {

      const { contactId } = req.params;
      const updatedContact = await contactsOperations.updateContact(contactId, req.body);
      if (!updatedContact) {
        throw getError(404, "Not found");
      } else {
        res.json(updatedContact);
      }
    }

module.exports = updateById