const User = require("../../models/users");
const { HttpError } = require("../../helpers");

 const updateFieldSubscription = async (req, res, next) => {
     const { _id } = req.params;
     const { subscription } = req.body;
     
     console.log(subscription);
     console.log(_id)
     const result = await User.findByIdAndUpdate(_id, { subscription: subscription });
     
    if (!result) {
      throw HttpError(404, `Not found contact with id:${_id}`)
    }
    res.json(result)

 }

 module.exports = updateFieldSubscription