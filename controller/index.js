const service = require('../service/index')



const getContacts = async (req, res, next) => {
    try {
        const results = await service.getAllContacts();
        console.log(results)
        res.json({
          status: 'success',
          code: 200,
          data: {
            contacts: results,
          },
        }) 
      } catch (e) {
        console.error(e)
        next(e)
      }
};


// const get = async () => {
//     try {
//       const results = await service.getAlltasks()
//       res.json({
//         status: 'success',
//         code: 200,
//         data: {
//           tasks: results,
//         },
//       }) 
//     } catch (e) {
//       console.error(e)
//       next(e)
//     }
//   }





// const listContacts = async () => {
//   try {
//     const contacts = await getContacts();
//     return contacts;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contacts = await getContacts();
//     const contactById = contacts.find((contact) => contact.id === contactId);

//     if (contactById) {
//       return contactById;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await getContacts();
//     const contactIndex = contacts.findIndex(
//       (contact) => contact.id === contactId
//     );

//     if (contactIndex !== -1) {
//       contacts.splice(contactIndex, 1);
//       const contactsJson = JSON.stringify(contacts, null, 2);
//       await fs.writeFile(contactsPath, contactsJson, "utf-8");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const addContact = async (name, email, phone) => {
//   try {
//     const contacts = await getContacts();
//     const id = uuidv4();
//     const newContact = {
//       id,
//       name,
//       email,
//       phone,
//     };

//     contacts.push(newContact);
//     const contactsJson = JSON.stringify(contacts, null, 2);
//     await fs.writeFile(contactsPath, contactsJson, "utf-8");
//     return newContact
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const result = await service.createContact({ name, email, phone })

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}







// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await getContacts();
//     const index = contacts.findIndex(({ id }) => id === contactId);

//     if (index === -1) return;

//     contacts[index] = { ...contacts[index], ...body };
//     const contactsJson = JSON.stringify(contacts, null, 2);
//     await fs.writeFile(contactsPath, contactsJson, "utf-8");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const updateContactStatus = async (contactId, body) => {
//     try {
//       const contacts = await getContacts();
//       const index = contacts.findIndex(({ id }) => id === contactId);
  
//       if (index === -1) return;
  
//       contacts[index] = { ...contacts[index], ...body };
//       const contactsJson = JSON.stringify(contacts, null, 2);
//       await fs.writeFile(contactsPath, contactsJson, "utf-8");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  

module.exports = {
  getContacts,
//   getContactById,
//   removeContact,
  addContact,
//   updateContact,
//   updateContactStatus,
};
