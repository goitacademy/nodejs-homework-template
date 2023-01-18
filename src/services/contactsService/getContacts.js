const { Contact } = require("../../db");

const getContacts = async (id, options, favorite) => {
  if (favorite === undefined) {
    const contacts = await Contact.paginate({ owner: id }, options);
    return contacts;
  }
  const contacts = await Contact.paginate(
    { owner: id, favorite: favorite },
    options
  );
  return contacts;
};

module.exports = {
  getContacts,
};
