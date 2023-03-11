const { getContactById } = require("../../service/contacts");
const { RequestError } = require("../../helpers");
const getOneContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await getContactById(contactId, owner);

  if (!data || data.length === 0) {
    throw RequestError(404, "Not found");
  }
  res.json({ status: "success", data });
};
module.exports = getOneContactController;
