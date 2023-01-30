const { setSuccessResponse } = require("../../helpers");
const { createContact } = require("../../models/contacts");

const createContactController = async (req, res) => {
  const newContact = await createContact(req.body);
  res.json(setSuccessResponse(200, newContact));
};

module.exports = createContactController;
