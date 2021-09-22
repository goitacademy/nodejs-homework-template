const fs = require("fs/promises");
const contactsPath = require("../utils/contactsPath");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = getAllContacts;

// import fs from "fs/promises";
// import contactsPath from "../utils/contactsPath.js";

// const getAllContacts = async () => {
//   const data = await fs.readFile(contactsPath, "utf8");
//   const contacts = JSON.parse(data);
//   return contacts;
// };

// export default getAllContacts;
