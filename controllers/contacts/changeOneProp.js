const { Contact, joiSchemaFavorite } = require("../../models/contact");

const changeOneProp = async (req, res, next) => {
  try {
    const { error } = joiSchemaFavorite.validate(req.body);
    if (error) {
      error.status = 400;
      throw error({ message: "missing field favorite" });
    }
    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = changeOneProp;
