const { ContactModel } = require("../../models/contact");

const getAll = async () => {
  const data = await ContactModel.find({});
  return data;
};
module.exports = getAll;
