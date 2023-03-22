const { Command } = require("commander");

const contactsApi = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function handleSuccess(data) {
  console.log("OK");
  console.log(data);
}

function handleError(error) {
  console.error("ERROR");
  console.error(error.message);
}

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsApi.listContacts().then(handleSuccess).catch(handleError);
      break;

    case "get":
      contactsApi.getContactById(id).then(handleSuccess).catch(handleError);
      break;

    case "add":
      contactsApi.addContact(name, email, phone).then(handleSuccess).catch(handleError);
      break;

    case "update":
      contactsApi.updateContact(id, name, email, phone).then(handleSuccess).catch(handleError);
      break;

    case "remove":
      contactsApi.removeContact(id).then(handleSuccess).catch(handleError);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
