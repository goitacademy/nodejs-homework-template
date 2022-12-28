const { updateStatusContact } = require("../../service/contacts");

const patchFavoriteContactController = async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    res.status(400).json({ message: "Missing field favorite" });
  }
  const data = await updateStatusContact(contactId, req.body);
  if (data) {
    res.status(200).json({ message: data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = patchFavoriteContactController;
