// const { updateContact } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // const contact = await updateContact(contactId, body);
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!contact) {
    return res.status("404").json({
      msg: "Not Found!",
    });
  }
  res.status("200").json(contact);
};
