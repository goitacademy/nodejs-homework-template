const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((contactsList) => {
        console.table(contactsList);
      });
      break;

    case "get":
      contacts.getContactById(id).then((oneContact) => {
        console.log(oneContact);
      });
      break;

    case "add":
      contacts.addContact(name, email, phone).then((newContact) => {
        console.log(newContact);
      });
      break;

    case "remove":
      contacts.removeContact(id).then((deletedContact) => {
        console.log(deletedContact);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
