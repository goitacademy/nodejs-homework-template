const { User, schemas } = require("../../models/users");
const { RequestError } = require("../../helpers");

const patchUser = async (req, res, next) => {
  try {
    const { error } = schemas.usersPatchSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Invalid value");
    }
    const userId = req.user._id;
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = patchUser;
