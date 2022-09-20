const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { program } = require("commander");
const contacts = require("./models/contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse();
const options = program.opts();

const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list": {
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;
    }
    case "get": {
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    }
    case "add": {
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    }
    case "remove": {
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;
    }
    case "update": {
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);

module.exports = app;
