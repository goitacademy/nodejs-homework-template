const createError = require("http-errors");

const { Contact } = require("../../models/contact");

// const removeContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Contact.findByIdAndDelete(id);
//     if (!result) {
//       throw createError(400, "Not found");
//     }
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

// ===2====
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(400, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeContact;
