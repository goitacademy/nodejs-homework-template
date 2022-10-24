const { contacts: contactsOperations } = require("../../service");

const getById = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;

  const contact = await contactsOperations.getContactById(contactId, userId);

  res.status(200).json({ status: "success", contact });
};


module.exports = getById;