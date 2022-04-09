const { Contact } = require('../../models');

const patchFavorite = async (req, res, next) => {
    const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, {favorite}, {new:true});

  if (!updatedContact) {
    res.status(404).json({ status: "error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 200, data: updatedContact });
}

module.exports = patchFavorite;