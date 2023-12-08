<<<<<<< HEAD
const { Contact, schema } = require("../../models/contact");

const add = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
=======
const Contact = require("../../models/contact");
const { schema } = require("../../schemas/schemaJoi");

const add = async (req, res) => {
  const body = req.body;
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
<<<<<<< HEAD
  const result = await Contact.create({ ...body, owner: _id });
=======
  const result = await Contact.create(body);
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      result,
    },
  });
};

module.exports = add;