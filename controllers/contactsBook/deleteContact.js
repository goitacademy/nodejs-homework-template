
const {Contact} = require("../../models");
const {ctrlWrapper, HttpError} = require("../../helpers");

const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
  return  res.status(200).json({ message: "Delete success contact", result });
};

module.exports = {
    deleteContact: ctrlWrapper(deleteContact),
  };