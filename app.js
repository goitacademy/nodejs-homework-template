const express = require("express");
const { program } = require("commander");
const logger = require("morgan");

const cors = require("cors");
const contacts = require("./models/contacts");

const contactsRouter = require("./routes/api/contacts");

// ініціалізація сервера
const app = express();

// запускаємо логгер
app.use(logger("combined"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробник помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getList": {
      const list = await contacts.listContacts();
      return console.log(list);
    }
    case "getById": {
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    }
    case "deleteContact": {
      const contactStatus = await contacts.removeContact(id);
      return console.log(contactStatus);
    }
    case "addContact": {
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    }
    case "updateContact": {
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option("-a, --action, <type>")
  .option("-id, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");

program.parse();
const options = program.opts();
invokeAction(options);
module.exports = app;
