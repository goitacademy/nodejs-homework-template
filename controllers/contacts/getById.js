const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  contact
    ? res.status(200).json({ status: "success", data: contact })
    : res.status(404).json({ message: "Not found" });
};

module.exports = getById;