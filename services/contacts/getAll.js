const { Contact } = require("../../models");

const getAll = async (id, skip, limit, favorite) => {
  if (favorite) {
    const contacts = await Contact.find({ owner: id, favorite });
    return contacts;
  }

  const contacts = await Contact.find({ owner: id })
    .skip(skip)
    .limit(limit)
    .select({ __v: 0 });
  return contacts;
};

module.exports = getAll;
