const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateFavourite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favourite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favourite },
      { new: true }
    );
    if (!result) {
      res.status(400).json({ message: "missing field favorite" });
      next();
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: "missing field favorite" });
    // next(error) як перекинути на 500 помилку?;
  }
};

module.exports = updateFavourite;
