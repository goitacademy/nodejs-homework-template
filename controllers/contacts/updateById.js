const contactsOperations = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContact(contactId, req.body);
  contact
    ? res.status(200).json({ data: contact })
    : res.status(404).json({ message: "Not found" });
};

module.exports = updateById;