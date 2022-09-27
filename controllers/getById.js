const { Contact } = require("../models/contact");
const { RequestError } = require("../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log("~ result", result);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
  //   if (result) {
  //     res.json(result);
  //   } else {
  //     throw RequestError(404);
  //   }
};

module.exports = getById;
