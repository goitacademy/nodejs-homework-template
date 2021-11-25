const { listContacts } = require("../../services");

const getContactsList = async (_, res) => {
  const result = await listContacts();

  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = getContactsList;
