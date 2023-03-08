const { updateStatusContactById } = require("../../service/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const data = await updateStatusContactById(contactId, req.body, owner);
  if (!data) {
    throw RequestError(404, "Not found");
  }
  return res.json({ status: "success", data });
};
module.exports = updateStatusContactController;
