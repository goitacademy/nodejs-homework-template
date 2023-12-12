const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
};
