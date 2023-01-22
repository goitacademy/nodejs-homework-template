const getContacts = require("./getContacts");

const getContactById = async (id) => {
  const res = await getContacts();
  const [result] = res.filter((el) => el.id === id);
  return result;
};

module.exports = getContactById;
