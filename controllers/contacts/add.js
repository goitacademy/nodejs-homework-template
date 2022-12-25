const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const { body } = req;
  const result = await addContact(body);

  try {
    res.status(201).json({
      status: "created",
      code: 201,
      data: { result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = add;
