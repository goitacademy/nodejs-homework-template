const { Contact } = require("../../model");
const { BadRequest } = require("http-errors");
const { contactSchema } = require("../../validation");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const data = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = add;
