// PUT - update information about contact
const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const update = async (req, res, next) => {
  try {
    const contact = req.body;
    const { id } = req.params;
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const result = await Contact.findByIdAndUpdate(id, contact);
    if (result) {
      res.status(200).json({
        data: result,
        message: 'contact updated',
      });
    } else {
      throw createError(404);
      // res.status(404).json({
      //   message: `Not found contact id: ${id}`,
      //   data: "Not Found",
      // });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = update;
