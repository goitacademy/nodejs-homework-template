const { addContact } = require("../../model");

const add = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
