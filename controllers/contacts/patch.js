const { Contact } = require("../../models/contact");
// const createError = require("http-errors");

const updateFavoriteById = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    // eslint-disable-next-line new-cap
    // throw new createError(400, `${id} missing field favorite`);
    const error = new Error("missing field favorite");
    error.status = 400;
    throw error;
    // eslint-disable-next-line no-unreachable
    // res.status(404).send(`Contact with${id} not favorite`);
  }
  res.status(200).json({ status: "success", data: result });
};
module.exports = updateFavoriteById;
