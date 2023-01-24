const { getContactById } = require("../../servises/contacts");

const getContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: `Contact not found` });
  }
  res.json({ contact, message: "Success!" });
};

module.exports = {
  getContactById: getContactByIdController,
};
