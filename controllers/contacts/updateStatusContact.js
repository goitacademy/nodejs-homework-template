const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  console.log(req.body);
  console.log(favorite);

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  console.log(result);
  if (!result) {
    throw createError(404, `Contact with id ${contactId} Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
