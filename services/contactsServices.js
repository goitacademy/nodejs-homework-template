const Contact = require("../models/contact");

const HttpError = require("../utils/HttpError");

async function listContactsService(req, res, next) {  

  try {
    const contacts = await Contact.find({ owner: req.user.id }).exec();

    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

const getContactByIdService = async (req, id) => {
  console.log("це contact Service - getContactByIdService", req.user.id, id);
  const tasks = await Contact.find({ owner: req.user.id }).exec();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new HttpError(404);
  }  

  return task;
};

const addContactService = async (req) => {  
  
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user.id,
  };  

  await Contact.create(contact);  

  return contact;
};

const removeContactService = async (id) => {
  const tasks = await Contact.find().exec();

  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new HttpError(404);
  }

  await Contact.findByIdAndDelete(id);  

  return id;
};

const updateContactService = async (id, body) => {
  const tasks = await Contact.find().exec();

  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new HttpError(404);
  }

  const contact = body;

  await Contact.findByIdAndUpdate(id, contact, { new: true });

  console.log("це Contact Services - updateContact - оновлено ", id);

  return id;
};

const favoriteContactService = async (id, body) => {
  const tasks = await Contact.find().exec();

  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new HttpError(404);
  }

  const contact = body;

  if (!contact.favorite) {
    throw new Error({ message: "missing field favorite" });
  }

  const newContact = tasks[index];
  newContact.favorite = contact.favorite;

  await Contact.findByIdAndUpdate(id, newContact, { new: true });

  console.log("це Contact Services - favoriteContact - оновлено ", id);

  return id;
};

const partiallyContactService = async (id, body) => {
  const tasks = await Contact.find().exec();

  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new HttpError(404);
  }

  const newContact = tasks[index];

  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };

  if (contact.name !== undefined) {
    newContact.name = contact.name;
  }
  if (contact.email !== undefined) {
    newContact.email = contact.email;
  }
  if (contact.phone !== undefined) {
    newContact.phone = contact.phone;
  }

  await Contact.findByIdAndUpdate(id, newContact, { new: true });

  console.log("це Contact Services - partiallyContact - оновлено ", id);

  return id;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  favoriteContactService,
  partiallyContactService,
};
