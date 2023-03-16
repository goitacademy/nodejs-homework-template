// const { getContactById } = require("../../models/contacts");
const { Contact } = require("../../models");

exports.getContactById = async (req, res) => {
  const contactId = req.params.contactId;

  // const contact = await getContactById(contactId);
  const contact = await Contact.findOne({ _id: contactId });

  if (!contact) {
    return res.status(404).json({
      msg: "Not Found!",
    });
  }
  res.status("200").json(contact);
};
