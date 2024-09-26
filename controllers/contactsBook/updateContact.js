const {Contact} = require("../../models");
const {ctrlWrapper, HttpError} = require("../../helpers");

const {putSchema} = require("../../models");


const updateContact = async (req, res, next) => {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }

    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, "missing field favorite");
    }
  return  res.status(200).json(result);
};

module.exports = {
  updateContact: ctrlWrapper(updateContact),
};
