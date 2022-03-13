const fs = require("fs").promises;

const listContacts = async () => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

//

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const contact = JSON.parse(contacts).find((e) => e.id === contactId);
  return contact;
};

//

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedContacts = JSON.parse(contacts);

  if (parsedContacts.find(({ id }) => id === contactId) !== undefined) {
    const newContacts = parsedContacts.filter(({ id }) => id !== contactId);
    fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(newContacts, null, "\t"),
      "utf8",
      (err) => {
        if (err) throw err;
        return "contact deleted";
      }
    );
  } else {
    return "Not found";
  }
};

//

const addContact = async (body) => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedContacts = JSON.parse(contacts);

  const newId = (
    Number(parsedContacts[parsedContacts.length - 1].id) + 1
  ).toString();
  const { name, email, phone } = body;
  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };

  const newContacts = [...parsedContacts, newContact];
  fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(newContacts, null, "\t"),
    "utf8",
    (err) => {
      if (err) throw err;
      console.log(`Nowy kontakt dodany`);
    }
  );
  return newContact;
};

//

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(
    "./models/contacts.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedContacts = JSON.parse(contacts);
  const { name, email, phone } = body;
  if (parsedContacts.find(({ id }) => id === contactId) !== undefined) {
    const [updatedContact] = parsedContacts.find(({ id }) => id === contactId);
    updatedContact.name = name;
    updatedContact.email = email;
    updatedContact.phone = phone;
    
    fs.writeFile(
      "./models/contacts.json",
      JSON.stringify(newContacts, null, "\t"),
      "utf8",
      (err) => {
        if (err) throw err;
        return "contact deleted";
      }
    );
  } else {
    return "Not found";
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
