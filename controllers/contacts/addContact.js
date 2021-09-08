const { contacts: service } = require("../../services");

const addContact = async (req, res, next) => {
  try {
    const newContact = { ...req.body, owner: req.user._id };
    const result = await service.add(newContact);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
