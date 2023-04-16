const contacts = require("./models/contacts");
// імпортую файл contacts.js
const { Command } = require("commander");

/// 2 метод  ======>
// const yargs = require("yargs");
// const argv = require("yargs").argv;
/// argv щоб в ктермінал виводилася потрібна операція
/// yarn    //yarn add yargs
/// node index --action get --id 1     в терміналі
///   ==============>

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const spliceContacts = await contacts.removeContact(id);
      return console.log(spliceContacts);

    case "update":
      const updateContact = await contacts.updateContact({
        id,
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
