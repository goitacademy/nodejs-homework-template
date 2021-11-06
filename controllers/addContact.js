const operations = require("../model/contacts");

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const contact = await operations.addContact(body);
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
