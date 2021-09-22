const getAllContacts = require("./getAll");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContactById = require("./removeContactById");
const updateContactById = require("./updateContactById");
const updateContacts = require("./updateContacts");

module.exports = {
  getAllContacts,
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContacts,
  updateContactById,
};

// import getAllContacts from "./getAll.js";
// import listContacts from "./listContacts.js";
// import getContactById from "./getContactById.js";
// import addContact from "./addContact.js";
// import removeContactById from "./removeContactById.js";
// import updateContacts from "./updateContacts.js";
// import updateContactById from "./updateContactById.js";

// export default {
//   getAllContacts,
//   listContacts,
//   getContactById,
//   addContact,
//   removeContactById,
//   updateContacts,
//   updateContactById,
// };
