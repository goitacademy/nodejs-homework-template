// const crypto = require("crypto");

const Book = require("../models/contact");

// const { readDB, writeDb } = require("../utils/db");

// const listContactsService = async () => {
//   return await readDB();
// };

const listContactsService = async () => {
  return await Book.find().exec();
};

const getContactByIdService = async (id) => {
  const tasks = await Book.find().exec();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Contact not found");
  }
  return task;
};

const addContactService = async (body) => {
  // const tasks = await readDB();
  // const tasks = await Book.find().exec();
  // const newTask = { ...body, id: crypto.randomUUID() };
  // tasks.push(newTask);
  // await writeDb(tasks);
  //  return newTask;
  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };
  await Book.create(contact);
  return contact;
};

const removeContactService = async (id) => {
  // const tasks = await readDB();
  const tasks = await Book.find().exec();
  console.log(
    "це Contact Services - removeContact, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }
  // const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

  // console.log(
  //   "це Contact Services - removeContact, довжина нового масиву",
  //   newTasks.length
  // );

  await Book.findByIdAndDelete(id);

  console.log("це Contact Services - removeContact - видалено ", id);

  return id;
};

const updateContactService = async (id, body) => {
  // const tasks = await readDB();
  const tasks = await Book.find().exec();
  console.log(
    "1- це Contact Services - updateContact, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }

  // const { name, email, phone } = body;
  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };

  if ((contact.name && contact.email && contact.phone) === undefined) {
    throw new Error("Not specified all values");
  } // не працює з полем яке має значення true - false

  // const newTask = { ...body, id };
  // const newTasks = [
  //   ...tasks.slice(0, index),
  //   newTask,
  //   ...tasks.slice(index + 1),
  // ];

  await Book.findByIdAndUpdate(id, contact, { new: true });
  const newTasks = await Book.find().exec();

  console.log(
    "2 - це Contact Services - updateContact, довжина нового масиву",
    newTasks.length
  );

  // await writeDb(newTasks);

  console.log("це Contact Services - updateContact - оновлено ", id);

  return id;
};

const favoriteContactService = async (id, body) => {
  const tasks = await Book.find().exec();
  console.log(
    "1- це Contact Services - favoriteContact, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }

  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };

  console.log(
    "1.1 - це Contact Services - favoriteContact ",
    { index },
    { contact }
  );

  if (contact.favorite === undefined) {
    throw new Error({ message: "missing field favorite" });
  }

  const newContact = tasks[index];
  newContact.favorite = contact.favorite;

  await Book.findByIdAndUpdate(id, newContact, { new: true });
  const newTasks = await Book.find().exec();

  console.log(
    "2 - це Contact Services - favoriteContact, довжина нового масиву",
    newTasks.length
  );

  console.log("це Contact Services - favoriteContact - оновлено ", id);

  return id;
};

const partiallyContactService = async (id, body) => {
  const tasks = await Book.find().exec();
  console.log(
    "1- це Contact Services - putTask, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }

  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };

  if ((contact.name && contact.email && contact.phone) === undefined) {
    throw new Error("Not specified all values");
  } // не працює з полем яке має значення true - false

  await Book.findByIdAndUpdate(id, contact, { new: true });
  const newTasks = await Book.find().exec();

  console.log(
    "2 - це Contact Services - putTask, довжина нового масиву",
    newTasks.length
  );

  console.log("це Contact Services - putTask - оновлено ", id);

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
