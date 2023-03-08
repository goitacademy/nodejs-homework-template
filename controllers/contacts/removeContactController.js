const { RequestError } = require("../../helpers");
const { removeContact } = require("../../service/contacts");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const data = await removeContact(contactId, owner);
  if (!data) {
    throw RequestError(404, `Contact with ID:${contactId} not found!`);
  }
  res.json({
    status: "success",
    message: `Contact with ID:${data.id} name:${data.name} deleted!`,
  });
};
module.exports = removeContactController;
