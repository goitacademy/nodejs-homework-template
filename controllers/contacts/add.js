const { Contact } = require("../../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.json({
    status: "success",
    code: 201,
    date: {
      result,
    },
  });
};

module.exports = add;
