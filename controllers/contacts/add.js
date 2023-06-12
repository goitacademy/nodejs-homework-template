const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const add = async (req, res) => {

  const result = await Contact.create(req.body);

  console.log("result 🚀  => ", result)


  res.status(201).json(result);
};

module.exports = wrapper(add);
