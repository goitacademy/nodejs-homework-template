const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../helpers");

const updateContact = async (req, res) => {
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
  updateContact: ctrlWrapper(updateContact),
};
