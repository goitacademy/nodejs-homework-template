const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const contact = await User.findByIdAndUpdate(
    id,
    { subscription },
    {
      new: true,
    }
  );
  if (!contact) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    contact,
  });
};
module.exports = updateUser;
