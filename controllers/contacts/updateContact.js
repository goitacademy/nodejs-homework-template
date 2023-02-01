const Contact = require("../../models/contactsModel");

const updateContact = async (req, res) => {
    const contactId = req.params.contactId;
    const body = req.body;
    try {
      await Contact.updateOne(
        { _id: contactId },
        { name: body.name, phone: body.phone, email: body.email }
      );
      res.status(200).json({ status: "success", code: 200, data: body });
    } catch (error) {
      res.status(400).json({ code: 404, message: error.message });
    }
  };

module.exports = updateContact;