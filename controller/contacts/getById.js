const { contactsApi } = require("../../models");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsApi.getById(contactId);
  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }
  res.status(200).json({ data });
};

module.exports = getById;
