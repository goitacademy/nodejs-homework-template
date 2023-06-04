const { Contact } = require("../../models");
const { httpError } = require("../../helpers");
const { ctrlWrapper } = require("../../helpers");

const getContactRouteByID = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw httpError(404);
  }
  res.json(contactById);
};

module.exports = ctrlWrapper(getContactRouteByID);
