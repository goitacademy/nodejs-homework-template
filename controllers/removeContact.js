const Contacts = require("../model");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.removeContact(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
