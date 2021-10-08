const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact/contact");

const getAll = async (res) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccessRes(res, { result });
};

module.exports = getAll;
