const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, "Not found");
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;
  }
  res.json(result);
};
// res.status(500).json({ message: "Server error" });

module.exports = getById;
