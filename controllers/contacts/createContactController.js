const { setSuccessResponse } = require("../../helpers");
const operations = require("../../models/contacts");

const createContactController = async (req, res) => {
  const newContact = await operations.add(req.body);
  res.json(setSuccessResponse(200, newContact));
};

module.exports = createContactController;
