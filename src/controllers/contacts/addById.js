const { Contact } = require("../../models/contacts");

const addById = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(200).json({
    status: "created",
    code: 200,
    data: { result },
  });
};

module.exports = addById;
