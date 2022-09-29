const { ContactModel } = require("../../models/contact");

const add = async (contactBody, userId) => {
  const data = await ContactModel.create({ ...contactBody, owner: userId });
  return data;
};

module.exports = add;
