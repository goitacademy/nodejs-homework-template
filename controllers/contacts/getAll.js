const { Contact } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "_id name email phone favorite");
  sendSuccessResponse(res, { contacts });
};

module.exports = getAll;
