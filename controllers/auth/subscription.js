const {User} = require("../../models/user")

const subscription = async(req, res)=> {
  const { id } = req.params;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(id, { subscription }, { new: true });
    res.json(user);
}

module.exports = subscription;