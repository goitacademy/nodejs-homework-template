const { Contacts } = require("../../db/contactsModel");
async function favoriteChange(req, res, next) {
  const { name, email, phone, favorite = false } = req.body;
  const { contactId } = req.params;
  const upFavorite = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
  if (!upFavorite) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(upFavorite);
}
module.exports = {
  favoriteChange,
};
