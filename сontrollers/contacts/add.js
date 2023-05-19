const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing required name field");
  // }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = add;
