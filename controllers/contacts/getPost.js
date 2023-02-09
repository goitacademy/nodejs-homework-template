const { Contact } = require("../../models/contact");
const ObjectId = require('mongodb').ObjectId

const getPost = async (req, res) => {
  const { _id } = ObjectId(req.user);
  const resultPost = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "saccess ",
    code: 201,
    data: {
      resultPost,
    },
  });
};
module.exports = getPost;
