const operations = require("../../models/contacts");

const createContact = async (req, res) => {
  const result = await operations.add(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = createContact;
