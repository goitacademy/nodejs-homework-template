const readContact = require("./readContact");

const getContactById = async (contactId) => {
  const contacts = await readContact();
  return await contacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
};
module.exports = getContactById;
