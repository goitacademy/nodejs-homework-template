const { User } = require("../../model/user");
const { HttpError } = require('../../helpers');

const subscription = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    status: "seccess",
    code: 200,
    message: `User with id ${id} update success`,
    data: result
  });
}

module.exports = subscription



