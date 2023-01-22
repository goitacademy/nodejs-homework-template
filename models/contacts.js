const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(14).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    if (!parsedContacts.length) {
      console.log("no contacts");
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "no contacts found" });
    }

    res.json({
      message: "Your list of contacts",
      status: "success",
      code: 200,
      parsedContacts,
    });
    console.table(parsedContacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const { contactId } = req.params;
    const contactByID = parsedContacts.filter(
      (contact) => contact.id === contactId.toString()
    );

    if (!contactByID.length) {
      const error = new Error(`Contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      message: `contact by id=${contactId}`,
      status: "success",
      code: 200,
      contactByID,
    });
    console.table(contactByID);
  } catch (err) {
    next(err);
  }
};
const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, phone } = req.body;

    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);

    const newContacts = {
      id: v4(),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    };
    console.log(newContacts);

    parsedContacts.push(newContacts);
    console.table(parsedContacts);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const { contactId } = req.params;

    const contactById = parsedContacts.filter(
      (contact) => contact.id === contactId
    );
    if (!contactById.length) {
      const error = new Error(`contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    parsedContacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        res.status(200).json({
          message: `Updated contact by id=${contactId}`,
          code: 200,
          contact,
        });
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const { contactId } = req.params;

    const contactById = parsedContacts.filter(
      (contact) => contact.id === contactId
    );
    if (!contactById.length) {
      const error = new Error(`contact by id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    const contactsRemove = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    res.status(200).json({
      status: "success",
      message: `Contact by id=${contactId} deleted`,
      code: 200,
      contactsRemove,
    });

    await fs.writeFile(contactsPath, JSON.stringify(contactsRemove), "utf-8");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
