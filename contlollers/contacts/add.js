// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models");

const add = async (req, res, next) => {
  const { _id } = req.user;
  const { body } = req;

  const contact = await Contact.create({ ...body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: contact },
  });
};

module.exports = add;
