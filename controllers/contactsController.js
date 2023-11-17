const {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  favoriteContactService,
  partiallyContactService,
} = require("../services/contactsServices");

const listContacts = async (req, res, next) => {
  const tasks = await listContactsService();
  res.status(200).json(tasks);
  // res.send("Hello from tasks in controller");
  console.log("це contact Controller - listContacts", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const task = await getContactByIdService(contactId);
    res.status(200).json(task);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - getContactById", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addContact = async (req, res, next) => {
  try {
    const newTask = await addContactService(req.body);
    res.status(201).json(newTask);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - addContact", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
      body: req.body,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const delTask = await removeContactService(contactId);
    res.status(200).json(delTask);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - removeContact", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message_removeContact_500: error.message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const renewedTask = await updateContactService(contactId, req.body);
    res.status(200).json(renewedTask);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - updateContact", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message_updateContact_500: error.message });
  }
};

const favoriteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const renewedTask = await favoriteContactService(contactId, req.body);
    res.status(200).json(renewedTask);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - favoriteContact", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(400).json({ message: "missing field favorite" });
  }
};

const partiallyContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const renewedTask = await partiallyContactService(contactId, req.body);
    res.status(200).json(renewedTask);
    // res.send("Hello from tasks in controller");
    console.log("це contact Controller - partiallyContact", {
      url: req.originalUrl,
      statusMessage: res.statusMessage,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({ message_partiallyContact_500: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  favoriteContact,
  partiallyContact,
};
