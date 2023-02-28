const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
module.exports = updateContact;
