const { Contact } = require("../../models");
const listContacts = async (owner, skip, limit, favorite) => {
  const data = await Contact.find(favorite ? { owner, favorite } : { owner })
    .populate("owner", "email")
    .skip(skip)
    .limit(limit);
  return data;
};
module.exports = listContacts;
