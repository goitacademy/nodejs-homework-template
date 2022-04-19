const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: contact,
    },
  });
};

module.exports = add;