const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id, favorite: true }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  // const result = await Contact.find({}, "-favorite"); укажет все поля, кроме favorite
  // const result = await Contact.find({}, "name phone"); укажет только поля name phone
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

module.exports = listContacts;
