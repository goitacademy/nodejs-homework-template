const Contact = require("../models/contact");

const listContactsService = async () => {
  return await Contact.find().exec();
};

const getContactByIdService = async (id) => {
  const tasks = await Contact.find().exec();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Contact not found");
  }
  return task;
};

const addContactService = async (body) => {
  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };
  await Contact.create(contact);
  return contact;
};

const removeContactService = async (id) => {
  const tasks = await Contact.find().exec();
  console.log(
    "це Contact Services - removeContact, довжина масиву ",
    tasks.length
  );
  const index = tasks.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }

  await Contact.findByIdAndDelete(id);

  console.log("це Contact Services - removeContact - видалено ", id);

  return id;
};

const updateContactService = async (id, body) => {
  const tasks = await Contact.find().exec();
  console.log(
    "1- це Contact Services - updateContact, довжина масиву ",
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

  await Contact.findByIdAndUpdate(id, contact, { new: true });
  const newTasks = await Contact.find().exec();

  console.log(
    "2 - це Contact Services - updateContact, довжина нового масиву",
    newTasks.length
  );

  console.log("це Contact Services - updateContact - оновлено ", id);

  return id;
};

const favoriteContactService = async (id, body) => {
  const tasks = await Contact.find().exec();
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

  if (!contact.favorite) {
    throw new Error({ message: "missing field favorite" });
  }

  const newContact = tasks[index];
  newContact.favorite = contact.favorite;

  await Contact.findByIdAndUpdate(id, newContact, { new: true });
  const newTasks = await Contact.find().exec();

  console.log(
    "2 - це Contact Services - favoriteContact, довжина нового масиву",
    newTasks.length
  );

  console.log("це Contact Services - favoriteContact - оновлено ", id);

  return id;
};

const partiallyContactService = async (id, body) => {
  const tasks = await Contact.find().exec();
  console.log(
    "1- це Contact Services - partiallyContact, довжина масиву ", tasks.length );
  const index = tasks.findIndex((el) => el.id === id);
  
  if (index === -1) {
    throw new Error("Contact not found");
  }

  const newContact = tasks[index];

  const contact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  };  

  if ( !contact.name && !contact.email && !contact.phone ) {
    throw new Error("Not specified at least one value");
  }

  if (contact.name !== undefined) {
    newContact.name = contact.name;
  };
  if (contact.email !== undefined) {
    newContact.email = contact.email;
  };
  if (contact.phone !== undefined) {
    newContact.phone = contact.phone;
  };  

  await Contact.findByIdAndUpdate(id, newContact, { new: true });
  const newTasks = await Contact.find().exec();

  console.log(
    "2 - це Contact Services - partiallyContact, довжина нового масиву", newTasks.length
  );

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
