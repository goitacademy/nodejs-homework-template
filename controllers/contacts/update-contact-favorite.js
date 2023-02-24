const { ContactModel } = require("../../models/contact.model");

const updateContactFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    res.json({ message: "missing field favorite" });
  }
  const result = await ContactModel.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  res.json(result);
};

module.exports = {
  updateContactFavorite,
};
