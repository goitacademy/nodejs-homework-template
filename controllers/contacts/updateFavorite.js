const createError = require("http-errors");
const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updatedСontact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedСontact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "succsess",
    code: 200,
    data: updatedСontact,
  });
};

module.exports = updateFavorite;