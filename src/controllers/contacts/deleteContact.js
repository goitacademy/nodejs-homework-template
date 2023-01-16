const service = require("../../service");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    res.status(400).json({ message: "Not found" });
    return;
  }

  await service.removeContact(id);

  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
