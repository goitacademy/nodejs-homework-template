const { Contact } = require("../../models");

const addContact = async (body, userId) => {
  const user = new Contact({ ...body, owner: userId });
  await user.save();
};


module.exports = addContact;