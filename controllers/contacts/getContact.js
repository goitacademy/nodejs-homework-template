const Contact = require("../../models/contacts");

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  console.log(req, res);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};


module.exports = getContact;