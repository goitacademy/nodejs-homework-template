const argv = require("yargs").argv;
const logger = require("./routes/api/functions");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      logger.listContacts();
      break;

    case "get":
      logger.getContactById(id);
      break;

    case "add":
      logger.addContact(name, email, phone);
      break;

    case "remove":
      logger.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
