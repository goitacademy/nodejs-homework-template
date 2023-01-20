const {
  getContacts,
  getContactById,
  addContact,
} = require("../servises/contactsService");

const ctrlGetContacts = async (req, res, next) => {
  try {
    const result = await getContacts();

    if (!result.length) {
      console.log("no contacts");
      return res.status(404).json({ message: "no contacts found", code: 404 });
    }

    res.json({ message: "list of contacts", code: 200, data: result });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const ctrlGetContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (result) {
      return res.json({
        message: `contact by id: '${contactId}'`,
        code: 200,
        data: result,
      });
    }

    console.log(`no contacts by id: '${contactId}' found`);
    return res.status(404).json({
      message: `no contacts by id: '${contactId}' found`,
      code: 404,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const ctrlAddContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const newContact = {
      name,
      email,
      phone,
      favorite,
    };
    await addContact(newContact);

    res.status(201).json({ message: "contact created", code: 201, newContact });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// const removeContact = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const contacts = await fs.readFile(contactsPath, "utf-8");
//     const parsedContacts = JSON.parse(contacts);

//     const contactById = parsedContacts.find(
//       (contact) => contact.id === contactId
//     );
//     console.log("contact to delete:", contactById);

//     if (!contactById) {
//       console.log(`no contacts by id: '${contactId}' found`);

//       return res.status(404).json({
//         message: `no contacts by id: '${contactId}' found`,
//         code: 404,
//       });
//     }

//     const contactsAfterRemove = parsedContacts.filter(
//       (contact) => contact.id !== contactId
//     );

//     res.status(200).json({
//       message: `contact by id: '${contactId}' deleted`,
//       code: 200,
//       contactsAfterRemove,
//     });

//     console.log(contactsAfterRemove);

//     await fs.writeFile(
//       contactsPath,
//       JSON.stringify(contactsAfterRemove),
//       "utf-8"
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updateContact = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const { name, email, phone } = req.body;

//     const contacts = await fs.readFile(contactsPath, "utf-8");
//     const parsedContacts = JSON.parse(contacts);

//     const contactById = parsedContacts.find(
//       (contact) => contact.id === contactId
//     );

//     if (!contactById) {
//       console.log(`no contacts by id: '${contactId}' found`);

//       return res.status(404).json({
//         message: `no contacts by id: '${contactId}' found`,
//         code: 404,
//       });
//     }

//     parsedContacts.forEach((contact) => {
//       if (contact.id === contactId) {
//         contact.name = name;
//         contact.email = email;
//         contact.phone = phone;

//         res.status(200).json({
//           message: `updated contact by id: '${contactId}' `,
//           code: 200,
//           contact,
//         });
//       }
//     });

//     await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  // removeContact,
  // updateContact,
};
