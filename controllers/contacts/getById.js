const {Contact} = require("../../models/contact");
const  ctrlWrapper  = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  };
module.exports = { getById: ctrlWrapper(getById)};