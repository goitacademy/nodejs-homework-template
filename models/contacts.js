const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");
// console.log(__dirname);
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  // console.log(data);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// module.exports = [
//   {
//     id: "AeHIrLTr6JkxGE6SN-0Rw",
//     name: "Allen Raymond",
//     email: "nulla.ante@vestibul.co.uk",
//     phone: "(992) 914-3792",
//   },
//   {
//     id: "qdggE76Jtbfd9eWJHrssH",
//     name: "Chaim Lewis",
//     email: "dui.in@egetlacus.ca",
//     phone: "(294) 840-6685",
//   },
//   {
//     id: "drsAJ4SHPYqZeG-83QTVW",
//     name: "Kennedy Lane",
//     email: "mattis.Cras@nonenimMauris.net",
//     phone: "(542) 451-7038",
//   },
//   {
//     id: "vza2RIzNGIwutCVCs4mCL",
//     name: "Wylie Pope",
//     email: "est@utquamvel.net",
//     phone: "(692) 802-2949",
//   },
//   {
//     id: "05olLMgyVQdWRwgKfg5J6",
//     name: "Cyrus Jackson",
//     email: "nibh@semsempererat.com",
//     phone: "(501) 472-5218",
//   },
//   {
//     id: "1DEXoP8AuCGYc1YgoQ6hw",
//     name: "Abbot Franks",
//     email: "scelerisque@magnis.org",
//     phone: "(186) 568-3720",
//   },
//   {
//     id: "Z5sbDlS7pCzNsnAHLtDJd",
//     name: "Reuben Henry",
//     email: "pharetra.ut@dictum.co.uk",
//     phone: "(715) 598-5792",
//   },
//   {
//     id: "C9sjBfCo4UJCWjzBnOtxl",
//     name: "Simon Morton",
//     email: "dui.Fusce.diam@Donec.com",
//     phone: "(233) 738-2360",
//   },
//   {
//     id: "e6ywwRe4jcqxXfCZOj_1e",
//     name: "Thomas Lucas",
//     email: "nec@Nulla.com",
//     phone: "(704) 398-7993",
//   },
//   {
//     id: "rsKkOQUi80UsgVPCcLZZW",
//     name: "Alec Howard",
//     email: "Donec.elementum@scelerisquescelerisquedui.net",
//     phone: "(748) 206-2688",
//   },
// ];
