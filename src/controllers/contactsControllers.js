const contactOperations = require("../models/contacts");

// const { request } = require("../../../app.js");

const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
  getContactById,
} = contactOperations;
console.log(listContacts);
console.log(addContact);
console.log(removeContact);
console.log(updateContact);
console.log(getContactById);

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org"] },
  }),
  phone: Joi.string(),
});

const getConts = async (req, res, next) => {
  res.send("Это главный роутер");
  try {
    const contacts = await listContacts();
    res.json({
      status: 200,
      data: contacts,
      contacts,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getContById = async (req, res, next) => {
  const contactId = req.params.id;
  console.log("ID=", contactId);
  res.send("Это роутер контакта c ID=" + contactId);
  if (!contactId) {
    return () => {
      console.log("Contact not found");
      res.status(404).json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contactById = await getContactById(contactId);
    console.log(contactById);
    return res.status(200).json({
      status: 200,
      data: {
        contactById,
      },
    });
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
      next();
    };
  } else {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      console.log(value);
      const newContacts = await addContact(value);
      console.log(newContacts);
      res.status(201).json({
        status: 201,
        data: {
          newContacts,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error.message);
    }
  }
};

const delContact = async (req, res, next) => {
  const contactId = req.params.id;
  if (!contactId) {
    return () => {
      res.status(400).json({
        message: "Not found",
        status: 404,
      });
      next();
    };
  } else {
    const contacts = await removeContact(contactId);
    return res.status(200).json({
      message: "contact deleted",
      status: 200,
      data: {
        contacts,
      },
    });
  }
};

const updateCont = async (req, res, next) => {
  const contactId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
      next();
    };
  } else if (contactId) {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      const updatedContact = await updateContact(contactId, value);
      return res.status(200).json({
        status: 200,
        data: {
          updatedContact,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
    }
  } else {
    return () => {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
      next();
    };
  }
};

module.exports = {
  getConts,
  getContById,
  createContact,
  delContact,
  updateCont,
};
