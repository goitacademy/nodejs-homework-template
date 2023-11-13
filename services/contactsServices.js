const crypto = require("crypto");

const { readDB, writeDb } = require("../utils/db");

const listContactsService = async () => {
  return await readDB();
};

const getContactByIdService = async (id) => {
  const tasks = await readDB();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Contact not found");
  }
  return task;
};

const addContactService = async (body) => {
  const tasks = await readDB();
  const newTask = { ...body, id: crypto.randomUUID() };
  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const removeContactService = async (id) => {
  const tasks = await readDB();
  console.log("це Contact Services - removeContact, довжина масиву ", tasks.length);
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }
  const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];

  console.log(
    "це Contact Services - removeContact, довжина нового масиву",
    newTasks.length
  );

  await writeDb(newTasks);

  console.log("це Contact Services - removeContact - видалено ", id);

  return id;
};

const updateContactService = async (id, body) => {
  const tasks = await readDB();
  console.log("1- це Contact Services - putTask, довжина масиву ", tasks.length);
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  } 

  const { name, email, phone } = body;

  if ((name && email && phone) === undefined) {
    throw new Error("Not specified all values");
  } // не працює з полем яке має значення true - false

  const newTask = { ...body, id };

  const newTasks = [
    ...tasks.slice(0, index),
    newTask,
    ...tasks.slice(index + 1),
  ];

  console.log(
    "2 - це Contact Services - putTask, довжина нового масиву",
    newTasks.length
  );

  await writeDb(newTasks);

  console.log("це Contact Services - putTask - оновлено ", id);

  return id;
};


module.exports = {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService
};
