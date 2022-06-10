const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res.status(404).json({ message: "contact not found" });
    } else {
      res.status(200).json(deletedContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
