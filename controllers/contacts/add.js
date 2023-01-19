const { Contacts } = require("../../model");

const add = async (reg, res) => {
  const result = await Contacts.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
