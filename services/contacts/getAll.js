const { contact } = require("../../models");
const { ContactModel } = contact;

const getAll = async () => {
  const data = await ContactModel.find({});
  return data;
};
module.exports = getAll;
