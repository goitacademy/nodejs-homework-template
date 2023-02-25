const Contacts = require("../models/contactsSchema");
// import { exit } from 'node:process';
function validate(contact) {
  if (!contact) {
    throw new Error("No contact provided");
  }
  if (!contact.name) {
    throw new Error("name is required");
  }
  if (!contact.email) {
    throw new Error("email is required");
  }
  if (!contact.phone) {
    throw new Error("phone is required");
  }
  if (!contact.favorite) {
    throw new Error("age is required");
  }
}

const allContacts = async (req, res, next) => {
  try {
    const result = await Contacts.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        contact: result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e); 

  }
};
const serchInContacts = async () => {
  const { name, email, phone, favorite } = req.query;
  console.log("name", name);
  try {
    const result = await Contacts.find({ name });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found : ${name}||${email}||${phone}||${favorite}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
   
  }
  res.json(result);
};
const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contacts.findById({ _id: contactId });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const addContact = async (req, res, next) => {
  try {
    validate(req.body);
    const entity = new Contacts(req.body);

    const record = await entity.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: record },
    });
    //
  } catch (e) {
    return next(e);
  }
};
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contacts.deleteOne({ _id: contactId });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    validate(req.body);
  } catch (e) {
    return next(e);
  }

  console.log("contactId", contactId);

  const record = await Contacts.updateOne({ _id: contactId }, req.body, {
    new: true,
  });
  console.log("record", record);

  res.json(record);
};

module.exports = {
  updateContact,
  removeContact,
  addContact,
  getById,
  allContacts,
  serchInContacts,
};

// const listcontacts=async(req, res, next)=>{
//     try {
//     const contacts = await functContacts.listContacts();
//     return res.json({
//       status: 'success',
//       code: 200,
//       data: { contacts },
//     });
//   } catch (error) {
//     next(error);
// }
//   }
// const findContactById= async(req, res, next)=>{
//     try {
//         const contact = await functContacts.getContactById(req.params.contactId);
//         if (contact) {
//           return res.status(200).json({
//             status: 'success',
//             code: 200,
//             data: { contact },
//             message: 'Contact loaded',
//           });
//         } else {
//           return res.status(404).json({
//             status: 'error',
//             code: 404,
//             data: 'Not found',
//           });
//         }
//       } catch (error) {
//         next(error);
//       }
// }
// const addContacts=async(req, res, next)=>{
//     try {
//         const {error}= validateSingup(req.body)
//     if(error){
//       return res.send(error.details)
//     }
//         const { name, email, phone } = req.body;
//         if (!name || !email || !phone) {
//           return res.status(400).json({
//             status: 'error',
//             code: 400,
//             data: 'Missing required fields',
//           });
//         }
//         const contact = await functContacts.addContact({ name, email, phone });
//         return res.status(201).json({
//           status: 'success',
//           code: 201,
//           message: 'Contact added',
//           data: { contact },
//         });
//       } catch (error) {
//         next(error);
//       }
// }
// const deletContact=async(req, res, next)=>{
//     try {
//         const contact = await functContacts.removeContactById(req.params.contactId);
//         if (contact) {
//           return res.status(200).json({
//             status: 'success',
//             code: 200,
//             data: { contact },
//             message: 'Contact removed',
//           });
//         } else {
//           return res.status(404).json({
//             status: 'error',
//             code: 404,
//             data: 'Not found',
//           });
//         }
//       } catch (error) {
//         next(error);
//       }
// }
// const updateContact =async(req, res, next)=>{
//     try {
//         const {error}= validateSingup(req.body)
//     if(error){
//       return res.send(error.details)
//     }
//         const { name, email, phone } = req.body;
//         if (!name && !email && !phone) {
//           return res.status(400).json({
//             status: 'error',
//             code: 400,
//             data: 'Missing fields to update',
//           });
//         }
//         const contact = await functContacts.updateContact(
//           req.params.contactId,
//           req.body,
//         );
//         if (contact) {
//           return res.status(200).json({
//             status: 'success',
//             code: 200,
//             message: 'Contact updated',
//             data: { contact },
//           });
//         } else {
//           return res.status(404).json({
//             status: 'error',
//             code: 404,
//             data: 'Not found',
//           });
//         }
//       } catch (error) {
//         next(error);
//       }

// }

// module.exports = {
//     listcontacts,
//     addContacts,
//     findContactById,
//     deletContact,
//     updateContact,
// };
