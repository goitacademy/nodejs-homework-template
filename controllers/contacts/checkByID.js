const { Contact } = require("../../models");
const { RequestError } = require("../../services");

const checkByID = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw RequestError(404, `id:${id} not found`);
  }
  res.status(200).json(data);
};

module.exports = checkByID;
