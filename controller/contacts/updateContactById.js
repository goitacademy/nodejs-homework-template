const { NotFound } = require("http-errors");
// const ContactsModel = require("../../model/contacts");
const { Contact } = require("../../model");

// const updateContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await ContactsModel.updateContact(contactId, req.body);
//   if (!contact) {
//     throw new NotFound(`Product with id=${contactId} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       contact,
//     },
//   });
// };

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateContactById;
