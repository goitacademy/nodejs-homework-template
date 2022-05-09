const { Contact } = require("../../models/contact");

const add = async (req, res) => {
    const { _id } = req.user;
    const contact = await Contact.create({ ...req.body, owner: _id });
  // const result = await Contact.create(req.body);
  res.status(201).json(contact);
};

module.exports = add;

// const addContact = async (req, res) => {
//   const { _id } = req.user;
//   const contact = await Contact.create({ ...req.body, owner: _id });
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: {
//       result: contact,
//     },
//   });
// };
