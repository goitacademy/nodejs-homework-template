const fs = require("fs/promises");
const { contactsPath } = require("../../utils");

// import fs from "fs/promises";
// import contactsPath from "../utils/contactsPath.js";

const updateContacts = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
};

// export default updateContacts;
module.exports = updateContacts;
