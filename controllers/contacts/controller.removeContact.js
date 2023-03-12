const { removeContact } = require("../../models/contacts");

exports.removeContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await removeContact(contactId);
    if (!contact) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }
    res.status("200").json({ message: "contact deleted" });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};
