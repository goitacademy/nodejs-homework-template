const createError = require("http-errors");
const { Contact } = require("../../models/contact");

// ===2===
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;

// const getContactById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Contact.findById(id);
//     if (!result) {
//       throw createError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     if(error.message.includes("Cast to OblectId failed")) {
//       error.status = 404;
//     }
//     next(error);
//   }
// };
