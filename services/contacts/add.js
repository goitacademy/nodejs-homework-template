const { Contact } = require("../../models");

const add = async (body, userId) => {
  const user = new Contact({ ...body, owner: userId });
  await user.save();
  // await Contact.insertOne({...body, owner: userId});
};

module.exports = add;
