const contactsOperations = require("../../model/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(
      Number(contactId) || contactId
    );
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
