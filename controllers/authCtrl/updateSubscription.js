const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
     if (!user) {
    return res.status(404).json({
            status: "error",
            code: 404,
            message: "Not found",
            })
  } else {
      return res.status(200).json({
                status: "success",
                code: 200,
                result: user,
              })
      } 
}

module.exports = updateSubscription;