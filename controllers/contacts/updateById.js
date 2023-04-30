const { ctrlWrapper } = require("../../utils");

const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findById(id);
  if (contact.owner.toString() !== owner.toString()) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

module.exports = { updateById: ctrlWrapper(updateById) };
