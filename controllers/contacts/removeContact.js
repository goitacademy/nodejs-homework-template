const Contact = require("../../models/contactsModel");

const removeContact = async (req, res) => {
    const contactId = req.params.contactId;
    try {
      await Contact.deleteOne({ _id: contactId });
      res.status(200).json({
        code: 200,
        message: "Contact deleted",
      });
    } catch (error) {
      res.status(404).json({ code: 404, message: "Not found" });
    }
  };

module.exports = removeContact;