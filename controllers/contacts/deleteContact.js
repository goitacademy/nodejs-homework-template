const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  deleteContact: ctrlWrapper(deleteContact),
};
