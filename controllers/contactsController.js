const fn = require("../models/contacts");
const errorHandler = require("../helpers/errorHandler");
const schema = require("../helpers/shemaValidation");
const wrapper = require("../helpers/tryCatch");

//обробка запитів

const handleGetAll = async (req, res, next) => {
  const data = await fn.listContacts();
  res.json(data);
};

const handleContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactById = await fn.getContactById(id);
  if (!contactById) {
    errorHandler(404);
  }
  res.json(contactById);
};

const handleAddNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log(req.body);

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0]);
    if (error.details[0].message.includes("is required")) {
      errorHandler(400, "missing required name field");
    }
    const text = error.details[0].message;
    errorHandler(400, text);
  }
  const newContact = await fn.addContact(name, email, phone);
  res.status(201).json(newContact);
};

const handleDeleteContactById = async (req, res, next) => {
  const id = req.params.id;
  const contactDeleteById = await fn.removeContact(id);
  if (contactDeleteById === null) {
    errorHandler(404);
  }
  res.json({ message: "contact deleted" });
};

const handleUpdataContactById = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body) {
    errorHandler(400, "missing fields");
  }

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0]);
    if (error.details[0].message.includes("is required")) {
      errorHandler(400, "missing required name field");
    }
    const text = error.details[0].message;
    errorHandler(400, text);
  }

  const result = await fn.updateContact(id, req.body);
  if (result === null) {
    errorHandler(404);
  }
  res.json(result);
};

// експорт функція огорнутих в шаблонізатор try catch
// в функцію шаблон (передається функція) та викликається в середині шаблону
module.exports = {
  handleGetAll: wrapper(handleGetAll),
  handleContactById: wrapper(handleContactById),
  handleAddNewContact: wrapper(handleAddNewContact),
  handleDeleteContactById: wrapper(handleDeleteContactById),
  handleUpdataContactById: wrapper(handleUpdataContactById),
};
