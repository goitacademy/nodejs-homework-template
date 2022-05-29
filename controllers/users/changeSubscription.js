const Joi = require("joi");
const { User } = require("../../models");

const joiShema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const changeSubscription = async (req, res) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }

    const { _id } = req.user;
    const { subscription } = req.body;
    const updatrContact = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        updatrContact,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = changeSubscription;
