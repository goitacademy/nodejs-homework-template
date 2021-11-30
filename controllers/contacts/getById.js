const { Contact } = require("../../model");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log("result ", result);
  if (!result) {
    const error = new Error(`Contact with id=${id} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
