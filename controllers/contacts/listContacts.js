const { contacts: service } = require("../../services");

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = { owner: req.user._id };
    const result = await service.getAll({ page, limit }, filter);

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

// const listContacts = async (req, res, next) => {
//   try {
//     const result = await service.getAll();
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = listContacts;
