const  { Contact } = require("../../models");


const getPost = async (req, res) => {
  const resultPost = await Contact.create(req.body);
  res.status(201).json({
    status: "saccess ",
    code: 201,
    data: {
      resultPost,
    },
  });
};
module.exports = getPost;
