const operations = require("../../model/contacts");
const schemaAdd = require("../../validation/JoiSchema");

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const contact = await operations.add(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
