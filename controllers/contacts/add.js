const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
