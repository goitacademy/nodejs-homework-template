

const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const getPut = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const resultPut = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  if (!resultPut) {
    throw new NotFound("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      resultPut,
    },
  });
};
module.exports = getPut;
