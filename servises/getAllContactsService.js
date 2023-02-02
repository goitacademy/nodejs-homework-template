const { Contact } = require("../db/contactModel");

const getAllContactsService = async () => {
  const data = await Contact.find({});
  console.log(data);
  return data;
};
module.exports = { getAllContactsService };
