// const app = require("./app");
const express = require("express");
const cors = require("cors");
// const { json } = require("express/lib/response");
const uuid = require("uuid").v4;
const fs = require("fs").promises;

const app = express();

// MIDDLEWARE=====================================
app.use(express.json());
app.use(cors());

/**custom general middleware to find contact by id */
app.use("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

    const contact = contacts.find((item) => item.id === id);

    if (!contact) {
      res.status(404).json({
        msg: "Contact does not exist..",
      });
    }

    req.contact = contact;

    next();
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
});

// CONTROLLER=====================================

// @ GET /api/contacts ---AllContacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile("./models/contacts.json"));

    res.status(200).json({
      msg: "Success",
      contacts,
    });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
});

// @ GET /api/contacts/:id OneContact
app.get("/contacts/:id", (req, res) => {
  const { contact } = req;

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

// @ POST /api/contacts ----AddContact

app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // validation

    // create new Contact object
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };
    // save contact data to DB
    const contactDB = await fs.readFile("./models/contacts.json");

    const contacts = JSON.parse(contactDB);
    contacts.push(newContact);

    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

    // send respons to the FE
    res.status(201).json({
      msg: "Contact created!",
      contact: newContact,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// @ DELETE /api/contacts/:id
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { contact } = req;

    // get all contacts from db
    // delete contact by id
    // // save contact data to DB
    res.sendStatus(204);
    // res.status(200).json({
    //   msg: "Success",
    // });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// @ PUT /api/contacts/:id

app.patch("/contacts/:id", async (req, res) => {
  try {
    const { contact } = req;
    const { name, phone } = req.body;
    // update contact data
    // get all contacts from db
    // overwrite contact with new data
    // // save contact data to DB
    res.status(202).json({
      msg: "Success",
      // contact: updateContact,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//SERVER INIT=======================================
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
