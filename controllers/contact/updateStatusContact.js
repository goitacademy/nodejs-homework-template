const contacts = require("../../models/contacts");
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      next(res.status(400).json({ message: "missing field favorite" }));
    }
    const updatedContact = await contacts.updateStatusContact(
      contactId,
      req.body
    );
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateStatusContact;
