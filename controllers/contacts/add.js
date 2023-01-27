const contactsOperations = require("../../routes/api/contacts");

const add = async (req, res, next) => {
  const result = await contactsOperations.add(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

module.exports = add;
