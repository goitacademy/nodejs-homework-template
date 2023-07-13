const {Contact} = require("../../models/contact")
// const { HttpError, ctrlWrapper } = require("../../helpers");

const  ctrlWrapper  = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");


const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact delete",
    });
  };
  module.exports = {
    deleteContactById: ctrlWrapper(deleteContactById),
  }