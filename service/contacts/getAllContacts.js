const { Contact } = require("../../models");

const getAllContacts = async (id, skip, limit, favorite) => {
  if (favorite) {
    const contacts = await Contact.find({ owner: id, favorite });
    return contacts;
  }
// Contact.find
  const contacts = await Contact.find({ owner: id })
    .skip(skip)
    .limit(limit)
    .select({ __v: 0 });
  return contacts;
};


module.exports = getAllContacts;