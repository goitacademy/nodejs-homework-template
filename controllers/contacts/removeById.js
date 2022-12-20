const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);
    if (!deletedContact) {
      res.status(404).json({ message: "Not found" });
      throw getError(404, "Not found");
    } else {
      res.json({ message: "contact deleted" });
    }
}

module.exports = removeById