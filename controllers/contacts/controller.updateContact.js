const { updateContact } = require("../../models/contacts");

exports.updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    const { name, phone, email } = req.body;

    if (!name && !phone && !email) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(contactId, body);
    if (!contact) {
      return res.status("404").json({
        msg: "Not Found!",
      });
    }
    res.status("201").json(contact);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};
