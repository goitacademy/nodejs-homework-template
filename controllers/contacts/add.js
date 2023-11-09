const { Contact, schema } = require("../../models/contact");

const add = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await Contact.create({ ...body, owner: _id });
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      result,
    },
  });
};

module.exports = add;
