const { getContactById } = require("../../models/contacts");

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    data: contact,
  });
};

module.exports = getContact;
