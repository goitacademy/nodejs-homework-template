const service = require("../../service");

const postContact = async (req, res, next) => {
  await service.createContact(req.body);
  res.status(201).json({
    status: "contact added successfully",
    code: 201,
  });
};

module.exports = postContact;
