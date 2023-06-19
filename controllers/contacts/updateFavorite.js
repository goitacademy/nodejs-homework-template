const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact updated successfully",
    data: {
      result,
    },
  });
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
};
