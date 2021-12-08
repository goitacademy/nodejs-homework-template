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
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};
module.exports = listContacts;
