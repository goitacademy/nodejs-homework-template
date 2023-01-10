// // Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
// const { Contact } = require("../../models");

// const getFavorite = async (req, res, next) => {
//   try {
//     const { _id } = req.user;

//     // const favorite = req.query.favorite;
//     console.log(req.query);
//     console.log(req.params);

//     const contacts = await Contact.find({ favorite: true }, "", {});

//     res.json({
//       status: "success",
//       code: 200,
//       contacts,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getFavorite;
