const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

const listContacts = async () => {
  try {
    const result = await Contact.find({});
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await Contact.find({});
    const result = JSON.parse(data);
    const resultById = result.filter((el) => el.id === contactId);
    return resultById;
  } catch (error) {
    console.error(error.message);
  }
};

// const removeContact = async (contactId) => {
//   try {
//     const rawData = await fs.readFile(contactsPath, "utf8");
//     const data = JSON.parse(rawData);
//     const ifIdInList = data.find((el) => el.id === contactId);
//     if (!ifIdInList) {
//       return ifIdInList;
//     } else {
//       const dataPostRemoved = data.filter((el) => el.id !== contactId);
//       const dataWithCorrectId = dataPostRemoved.map((el, index) => {
//         el.id = (index + 1).toString();
//         return el;
//       });

//       const dataToWrite = JSON.stringify(dataWithCorrectId, null, 2);

//       fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
//         if (err) throw err;
//         console.log("Data written to file");
//       });

//       return dataPostRemoved;
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const result = await Contact.create({ name, email, phone });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    console.log();
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    console.log();
  } catch (error) {
    console.error(error.message);
  }
};

const updateContactElement = async (contactId, body) => {
  try {
    console.log();
  } catch (error) {
    console.error(error.message);
  }
};

// const updateContact = async (contactId, body) => {
//   try {
//     const { name, email, phone } = body;
//     const rawData = await fs.readFile(contactsPath, "utf8");
//     const data = JSON.parse(rawData);
//     const ifIdInList = data.find((el) => el.id === contactId);
//     if (!ifIdInList) {
//       return ifIdInList;
//     }
//     data.forEach((el) => {
//       if (el.id === contactId) {
//         el.name = name;
//         el.email = email;
//         el.phone = phone;
//       }
//     });
//     const dataToWrite = JSON.stringify(data, null, 2);

//     fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
//       if (err) throw err;
//       console.log("Data written to file");
//     });
//     return data[contactId - 1];
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// const updateContactElement = async (body, contactId) => {
//   const { name, email, phone } = body;
//   const rawData = await fs.readFile(contactsPath, "utf8");
//   const data = JSON.parse(rawData);
//   const ifIdInList = data.find((el) => el.id === contactId);
//   if (!ifIdInList) {
//     return ifIdInList;
//   }
//   data.forEach((el) => {
//     if (el.id === contactId) {
//       if (name) {
//         el.name = name;
//       }
//       if (email) {
//         el.email = email;
//       }
//       if (phone) {
//         el.phone = phone;
//       }
//     }
//   });
//   const dataToWrite = JSON.stringify(data, null, 2);

//   fs.writeFile(`${contactsPath}`, dataToWrite, (err) => {
//     if (err) throw err;
//     console.log("Data written to file");
//   });
//   return data[contactId - 1];
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
};
