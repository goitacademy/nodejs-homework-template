const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, contactId, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);

    case "get":
      const getContact = await getContactById(contactId);
      return console.log(getContact);

    case "add":
      const addContacts = await addContact(name, email, phone);
      return console.log(addContacts);

    case "remove":
      const removeContacts = await removeContact(contactId);
      return console.log(removeContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
console.log(argv);
invokeAction(argv);
