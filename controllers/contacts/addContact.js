const { Contact } = require("../../model");
const { BadRequest } = require("http-errors");
const { contactSchema } = require("../../validation");

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const data = await Contact.create(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      data,
    },
  });
};

module.exports = add;
