const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(400, "Not found");
  }

  res.json(result);
};
module.exports = {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
