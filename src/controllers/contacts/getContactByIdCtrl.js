const { getContactById } = require("../../services");
const { RequestError } = require("../../helpers");

const getContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, owner);

  if (!contact || contact.length < 1) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    contact,
  });
};

module.exports = getContactByIdController;
