const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const { favorite = null } = req.body;

  const enumFavorite = new Set();
  enumFavorite.add(true);
  enumFavorite.add(false);

  if (favorite === null || !enumFavorite.has(favorite)) {
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
  }
  const updContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    { new: true }
  ); // ByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!updContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(updContact);
};

module.exports = updateStatusContact;
