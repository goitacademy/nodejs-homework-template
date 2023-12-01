const { Contact } = require("../../models");
const { status } = require("../../consts");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await Contact.findOne({ _id: contactId, owner });

  if (!data) {
    throw HttpError(status.NOT_FOUND);
  }
  res.json({ ...status.GET_SUCCESS, data });
};

module.exports = getById;
