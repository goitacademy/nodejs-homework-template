const { ContactModel } = require("../../models/contact");

const add = async (contactBody) => {
  const data = await ContactModel.create(contactBody);
  return data;
};

module.exports = add;
