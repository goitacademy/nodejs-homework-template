const { Contacts } = require("../models/contacts");

const add = async (req, res, next) => {
  const body = req.body;

  const result = await Contacts.create(body);

  try {
    res.json({
      status: "success",
      code: 201,
      body: {
        result,
      },
      message: "Сontact added",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
