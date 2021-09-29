const { Contact } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  sendSuccessResponse(res, { contacts });
};
module.exports = getAll;
