const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");


async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const resultPut = await Contact.findByIdAndUpdate(contactId,{ favorite },{ new: true });
  if (!resultPut) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      resultPut,
    },
  });
};
