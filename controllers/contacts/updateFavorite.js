const Contact = require("../../models/contact");

async function updateStatusContact(contactId, body) {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
}

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateStatusContact(contactId, req.body);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

module.exports = updateFavorite;