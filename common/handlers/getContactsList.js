const { listContacts } = require("../../controllers");
const getContactsList = async (_, res) => {
  const contactsList = await listContacts();

  return res.json({ contactsList, status: "success", code: 200 });
};

module.exports = getContactsList;
