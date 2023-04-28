const {Contact} = require("../../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "missing required name field",
    data: {
      result,
    },
  });
};

module.exports = add;