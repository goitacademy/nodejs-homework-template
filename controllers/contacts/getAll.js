const { Contact } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find(
    { owner: _id },
    "_id name email phone favorite"
  );
  sendSuccessResponse(res, { contacts });
};

module.exports = getAll;
