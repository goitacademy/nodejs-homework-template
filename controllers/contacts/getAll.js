const { Contact } = require("../../models");

const getAll = async (req, res) => {
    const result = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    date: {
      result,
    },
  })
};

module.exports = getAll;
// `router.get("/", async (req, res, next) => {
//   try {
//     const all = await contacts.listContacts();
//     res.json(all);
//   } catch (e) {
//     next(e);
//   }
// });
