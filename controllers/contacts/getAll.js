// const contacts = require("../../models/contacts.json");
const contacts = require("../../models/contacts");

// const getAll = async (_, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
const getAll = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAll;
