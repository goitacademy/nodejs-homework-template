const { contactsApi } = require("../../models");
const { RequestError } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsApi.remove(contactId);

  if (!data) {
    throw RequestError(404, `id:${contactId} not found`);
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
