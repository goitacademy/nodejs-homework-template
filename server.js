const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const argv = require("yargs").argv;
const contacts = require("./models/contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
