const { Contact } = require("../models/contact");

const updateFavorite = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  res.status(200).json(contact);
};

module.exports = updateFavorite;
