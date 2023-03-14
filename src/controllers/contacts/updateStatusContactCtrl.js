const { updateStatusContact } = require("../../services");

const updateStatusContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || typeof favorite !== "boolean") {
    return res
      .status(400)
      .json({ message: "Invalid or missing field: favorite" });
  }

  const updatedContact = await updateStatusContact(contactId, { favorite });

  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  return res.status(200).json(updatedContact);
};

module.exports = updateStatusContactCtrl;
