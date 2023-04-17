const {Contact} = require("../../models");
const {ctrlWrapper, HttpError} = require("../../helpers");

const getContactById = async (req, res, next) => {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
};

module.exports = {
    getContactById: ctrlWrapper(getContactById),
  };