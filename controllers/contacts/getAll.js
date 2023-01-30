// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models/contactsModel");

// const getAll = async (req, res, next) => {
//   const contacts = await contactOperations.listContacts();
//   res.json({
//     status: "success",
//     code: 200,
//     data: { result: contacts },
//   });
// };

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
};

module.exports = getAll;
