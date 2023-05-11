const yargs = require("yargs");
const contact = require("./contacts.js");
const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const invokeAction = async ({ action, name, id, email, phone }) => {
  switch (action) {
    case "read":
      const allContact = await contact.listContacts();
      console.log(allContact);
      break;
    case "contactName":
      const contactName = await contact.listContacts(name);
      console.log(contactName);
      break;
    case "contactsId":
      const contactId = await contact.getContactById(id);
      console.log(contactId);
      break;
    case "contactsPhone":
      const contactsPhone = await contact.getByPhone(phone);
      console.log(contactsPhone);
      break;
    case "contactsEmail":
      const contactsEmail = await contact.getByEmail(email);
      console.log(contactsEmail);
      break;
    case "add":
      const newContact = await contact.addContact({ name, phone, email });
      return console.log(newContact);
      break;
    case "remove":
      const deletContact = await contact.remove(id);
      return console.log(deletContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction({
  action: "read",
  contactName: "name",
  contactsPhone: "phone",
  contactsEmail: "email",
  add: "newContact",
  remove: "id",
}).then((result) => console.log(result));

// метод yarn

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);

// метод comancer

program
  .option("--action. <type>")
  .option("--name. <type>")
  .option("--id. <type>")
  .option("--emeal. <type>")
  .option("--phone. <type>");

const option = program.opts();
console.log(option);
