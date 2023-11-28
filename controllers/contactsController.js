const {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  favoriteContactService,
  partiallyContactService,
} = require("../services/contactsServices");

const controllerWrapper = require("../utils/controllerWrapper");
const {
  addContactValidationSchema,
  updateContactValidationSchema,
} = require("../utils/validation/tasks-validation-schemas");

const listContacts = async (req, res, next) => {
  const tasks = await listContactsService(req, res, next);
  res.status(200).json(tasks);

  console.log("це contact Controller - listContacts", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

const getContactById = controllerWrapper(async (req, res, next) => {
  
  const { contactId } = req.params;
  console.log("це contact Controller - getContactById", { contactId });
  const task = await getContactByIdService(req, contactId);
  res.status(200).json(task);

  console.log("це contact Controller - getContactById", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
  
});

const addContact = controllerWrapper(async (req, res, next) => {
  const response = addContactValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  console.log("це contact Controller - addContact - input", {
    req: req,
  });
   
  const newTask = await addContactService(req);
  res.status(201).json(newTask);

  console.log("це contact Controller - addContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
    body: req.body,
  });
});

const removeContact = controllerWrapper(async (req, res, next) => {
  
  const { contactId } = req.params;
  const delTask = await removeContactService(contactId);
  res.status(200).json(delTask);

  console.log("це contact Controller - removeContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
  
});

const updateContact = controllerWrapper(async (req, res, next) => {
  const response = addContactValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  
  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const { contactId } = req.params;
  const renewedTask = await updateContactService(contactId, req.body);
  res.status(200).json(renewedTask);

  console.log("це contact Controller - updateContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
  
});

const favoriteContact = controllerWrapper(async (req, res, next) => {
 
  const { contactId } = req.params;
  const renewedTask = await favoriteContactService(contactId, req.body);
  res.status(200).json(renewedTask);

  console.log("це contact Controller - favoriteContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
  
});

const partiallyContact = controllerWrapper(async (req, res, next) => {
 
  const response = updateContactValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const { contactId } = req.params;
  const renewedTask = await partiallyContactService(contactId, req.body);
  res.status(200).json(renewedTask);

  console.log("це contact Controller - partiallyContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });  
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  favoriteContact,
  partiallyContact,
};
