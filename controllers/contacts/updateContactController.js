const { updateContactById } = require("../../service/contacts");
const { RequestError } = require("../../helpers");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const data = await updateContactById(contactId, req.body, owner);
  if (!data) {
    throw RequestError(404, "Not found");
  }
  return res.json({ status: "success", data });
};

module.exports = updateContactController;
