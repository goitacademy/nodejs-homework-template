const Contacts = require("../model");
const { contactSchema } = require("../validation");
const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const { contactId } = req.params;
    const contact = await Contacts.updateContact(contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
