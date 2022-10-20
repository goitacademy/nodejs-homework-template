const { Contact } = require("../../models/contact");

const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!contact) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = updateById;