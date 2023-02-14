const { Contact } = require("../../models/contact");
// const ObjectId = require("mongodb").ObjectId;

const add = async (req, res) => {
  const { _id } = req.user;
  const contactAdd = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contactAdd,
    },
  });
};
module.exports = add;
