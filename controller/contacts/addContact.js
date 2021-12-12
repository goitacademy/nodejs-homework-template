// const ContactsModel = require("../../model/contacts");

// const addContact = async (req, res) => {
//   const addedContact = await ContactsModel.addContact(req.body);
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: {
//       addedContact,
//     },
//   });
// };
const { Contact } = require("../../model");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
