const { contacts: contactsOperations } = require("../../service");

const removeById = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const contact = await contactsOperations.removeContact(contactId, userId);

  res.status(200).json({ status: "success", contact });
};

module.exports = removeById;