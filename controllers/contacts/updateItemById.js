const { Contact } = require("../../models");
const { status } = require("../../consts");
const { HttpError } = require("../../helpers");

const updateItemById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const obj = req.body;

  const data = await Contact.findOneAndUpdate({ _id: contactId, owner }, obj, {
    new: true,
  });

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.PUT_SUCCESS, data });
};

module.exports = updateItemById;
