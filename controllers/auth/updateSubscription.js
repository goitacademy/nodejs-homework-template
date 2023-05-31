const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");
const {HttpError } = require("../../helpers")

const updateSubscription = async (req, res) => { 
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true })
     if (!result) {
    throw HttpError(404, "Not found");
  }
    res.json(result)  
}

module.exports = {
    updateSubscription: ctrlWrapper(updateSubscription)
}