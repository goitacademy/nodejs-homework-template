const { Contact } = require("../../models/contacts");

const updateFavorite = async (req, res, next) => {
  const requestId = req.params.contactId;

  const contact = await Contact.findByIdAndUpdate(requestId, req.body, {
    new: true,
  });
  res.status(200).json({ data: { contact } });
};

module.exports = updateFavorite;
