const { Contact } = require("../../models");

const add = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const newContact = await Contact.create({ ...req.body, owner: _id });
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
