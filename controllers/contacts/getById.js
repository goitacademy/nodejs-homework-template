const contactsOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: 200,
    data: { contact },
  });
};

module.exports = getById;
