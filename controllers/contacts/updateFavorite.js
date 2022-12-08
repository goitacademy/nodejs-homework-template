const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(400).json(`missing field favorite`);
  }
  res.status(200).json({ result });
};

module.exports = updateFavorite;
