const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(
  "/Users/aleksandr/git_hub_projects/nodejs-homework-rest-api/models/contacts.json"
);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(rawData);
    const dataById = data.filter((el) => el.id === contactId);
    return dataById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(rawData);
    const ifIdInList = data.find((el) => el.id === contactId);
    if (!ifIdInList) {
      return ifIdInList;
    } else {
      const dataPostRemoved = data.filter((el) => el.id !== contactId);
      const dataWithCorrectId = dataPostRemoved.map((el, index) => {
        el.id = (index + 1).toString();
        return el;
      });

      const dataToWrite = JSON.stringify(dataWithCorrectId, null, 2);

      fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
        if (err) throw err;
        console.log("Data written to file");
      });

      return dataPostRemoved;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { id, name, email, phone } = body;
    const rawData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(rawData);
    data.push({ id, name, email, phone });
    const dataToWrite = JSON.stringify(data, null, 2);

    fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
    return { id, name, email, phone };
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const rawData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(rawData);
    const ifIdInList = data.find((el) => el.id === contactId);
    if (!ifIdInList) {
      return ifIdInList;
    }
    data.forEach((el) => {
      if (el.id === contactId) {
        el.name = name;
        el.email = email;
        el.phone = phone;
      }
    });
    const dataToWrite = JSON.stringify(data, null, 2);

    fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
    return data[contactId - 1];
  } catch (error) {
    console.error(error.message);
  }
};

const updateContactElement = async (body, contactId) => {
  const { name, email, phone } = body;
  const rawData = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(rawData);
  const ifIdInList = data.find((el) => el.id === contactId);
  if (!ifIdInList) {
    return ifIdInList;
  }
  data.forEach((el) => {
    if (el.id === req.params.id) {
      if (name) {
        el.name = name;
      }
      if (email) {
        el.email = email;
      }
      if (phone) {
        el.email = phone;
      }
    }
  });
  const dataToWrite = JSON.stringify(data, null, 2);

  fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
  return data[contactId - 1];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
};
