const Contact = require("../../models/contact");
const { schema } = require("../../schemas/schemaJoi");

const add = async (req, res) => {
  const body = req.body;
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await Contact.create(body);
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      result,
    },
  });
};

module.exports = add;