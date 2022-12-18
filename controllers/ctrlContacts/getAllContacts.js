const { contactsService } = require("../../services");

const getAllContacts = async (req, res) => {
  const result = await contactsService.getAllContacts();

  if (result.length > 0) {
    return res.json(result);
  }

  res.status(204).json({ message: "No Content" });
};

module.exports = getAllContacts;
