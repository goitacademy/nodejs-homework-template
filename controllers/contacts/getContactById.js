const {Contact} = require("../../models/contact");

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id }); // search by any credential
  const result = await Contact.findById(id); // search by id only
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

module.exports = getContactById;
