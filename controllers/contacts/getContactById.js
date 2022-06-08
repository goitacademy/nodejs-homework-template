const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await Contact.find({ _id: contactId, owner: userId });

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(contact);
};

module.exports = getContactById;
