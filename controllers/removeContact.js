const { Contact } = require("../../models");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    if (!deleteContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "contact deleted",
      code: 200,
      data: { deleteContact },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = removeContact;
