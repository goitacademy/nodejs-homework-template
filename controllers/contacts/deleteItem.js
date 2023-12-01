const { Contact } = require("../../models");
const { status } = require("../../consts");
const { HttpError } = require("../../helpers");

const deleteItem = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.DELETE_SUCCESS });
};

module.exports = deleteItem;
