const { updateContact, getById } = require("../../../contacts");

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const existingContact = await getById(contactId);
    if (!existingContact) {
      return res.status(404).json({ message: "Not found" });
    }

    const updated = await updateContact(contactId, { favorite });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating favorite status:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  updateFavoriteStatus,
};
