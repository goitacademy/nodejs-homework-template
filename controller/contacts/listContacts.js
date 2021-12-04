// const ContactsModel = require("../../model/contacts");

// const listContacts = async (req, res) => {
//   const contacts = await ContactsModel.listContacts();
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: contacts,
//     },
//   });
// };

const { Contact } = require("../../model");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};
module.exports = listContacts;
