const { Contacts } = require("../models/contacts");

const add = async (req, res, next) => {
  if (req.body.favorite) {
    await Contacts.create(req.body, (req.body.favorite = false));
  }

  const result = await Contacts.create(req.body);

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
