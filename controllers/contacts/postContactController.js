const { Contact } = require("../../models");

async function postContactController(req, res, next) {
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
}

module.exports = postContactController;
