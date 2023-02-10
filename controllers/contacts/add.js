const { Contact, joiSchema } = require("../../models/contact");

const add = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.json({ message: "missing required name field" });
      throw error;
    }
    const contactAdd = await Contact.create(req.body);

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactAdd,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = add;
