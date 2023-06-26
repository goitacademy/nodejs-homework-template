const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted successfully",
  });
};

module.exports = {
  deleteContact: ctrlWrapper(deleteContact),
};
