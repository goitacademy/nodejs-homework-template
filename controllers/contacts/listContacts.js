const { Contact } = require("../../models/contact");

// const listContacts = async (req, res, next) => {
//   try {
//     const result = await Contact.find();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// ====2=====
const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
