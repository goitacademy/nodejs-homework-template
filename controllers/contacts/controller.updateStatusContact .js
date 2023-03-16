const { Contact } = require("../../models");

exports.updateStatusContact = async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!contact) {
    return res.status("404").json({
      msg: "Not Found!",
    });
  }
  res.status("200").json(contact);
};
