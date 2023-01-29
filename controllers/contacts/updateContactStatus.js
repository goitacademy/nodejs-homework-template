const { updateContactStatus } = require("../../servises/contacts");

const updateContactStatusController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const newStatus = req.body;

  const contact = await updateContactStatus(id, newStatus);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ contact, message: "Success, contact's status updated" });
};

module.exports = {
  updateContactStatus: updateContactStatusController,
};
