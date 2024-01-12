const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const Joi = require("joi");

// const constactsRouter = require("./routes/api/constacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactForm = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
});

function validateContact(req, res, next) {
  const { error } = contactForm.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Validation error: ${error.message}` }); // Poprawiona interpolacja stringa
  }
  next();
}

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", phone: "987-654-3210" },
];

function checkContactExists(req, res, next) {
  const contactId = parseInt(req.params.contactId);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  next();
}

app.get("/api/contacts", async (req, res, next) => {
  try {
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/api/contacts/:contactId",
  checkContactExists,
  async (req, res, next) => {
    try {
      // Błędne umieszczenie kodu, poprawione poniżej
      const contactId = parseInt(req.params.contactId);
      const contact = contacts.find((contact) => contact.id === contactId);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

app.post("/api/contacts", validateContact, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

app.delete(
  "/api/contacts/:contactId",
  checkContactExists,
  async (req, res, next) => {
    try {
      // Błędne umieszczenie kodu, poprawione poniżej
      const contactId = parseInt(req.params.contactId);
      const updatedContactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      // Błędne przypisanie, poprawione poniżej
      contacts[updatedContactIndex] = {
        ...contacts[updatedContactIndex],
        ...req.body,
      };
      res.json(contacts[updatedContactIndex]);
    } catch (error) {
      next(error);
    }
  }
);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
