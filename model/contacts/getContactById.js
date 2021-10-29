const readContact = require("./readContact");


const getContactById = async (contactId) => {
  const contacts = await readContact();
  const [result] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  return result;
};
module.exports = getContactById;
