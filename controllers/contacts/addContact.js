const { Contacts } = require("../../models/contacts");

const add = async (req, res, next) => {
  const { _id } = req.user;
  if (req.body.favorite) {
    await Contacts.create(
      { ...req.body, owner: _id },
      (req.body.favorite = false)
    );
  }

  const result = await Contacts.create({ ...req.body, owner: _id });

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

module.exports = add;
