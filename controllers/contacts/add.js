const contacts = require("../../models/contacts");


const add = async (req, res) => {
  console.log("req.body", req.body)
  const result = await contacts.add(req.body);
  res.status(201).json(result);
};
module.exports = add;
