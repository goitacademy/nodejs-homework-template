const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      result,
    },
  });
};

module.exports = add;
