// const fs = require('fs/promises')
const contacts = require("./contacts.json");
const { v4 } = require("uuid");
const Joi = require("joi");

const contactShema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
});

const listContacts = async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const findContact = contacts.find(
    (item) => item.id.toString() === contactId.toString()
  );
  if (!findContact) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: findContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const index = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );

  console.log(index);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  contacts.splice(index, 1);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

// {
//     "name": "Kyryl",
//     "email": "test@test.com",
//     "phone": "(111) 111-1111"
// }

const addContact = async (req, res) => {
  const { error } = contactShema.validate(req.body);

  if (error) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `missing required ${error.details.map(field => field.path)} field`,
    });
  }

  const newContact = { id: v4(), ...req.body };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact id not found",
    });
  }
  contacts[index] = { id: contactId, ...req.body };
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
