const Contact = require("../../models/contacts");
const getContactsByQuery = async (prop) => {
  const result = await Contact.find({ [prop]: true }).populate(
    "owner",
    "email"
  );

  return result;
};

module.exports = getContactsByQuery;
