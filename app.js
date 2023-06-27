const express = require("express");
// const logger = require("morgan");
const cors = require("cors");

const contacts = require("./models/contacts");

// const contactsRouter = require("./routes/api/contacts");

const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());
77;
// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });
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
// console.log(
//   invokeAction({ action: "deleteContact", id: "qdggE76Jtbfd9eWJHrssH" })
// );
console.log(
  invokeAction({
    action: "updateContact",
    id: "oNQoEGU2jUd2M3V1he0Dt",
    name: "RomaN",
    email: "Rrrroman@mail.ua",
    phone: "(992) 914-7777",
  })
);
// console.log(contacts.listContacts());

module.exports = app;
