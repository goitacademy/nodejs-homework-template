const {subscriptionJoiSchema} = require("../../models")
const createError = require("../../helpers");
const {User} = require('../../models')


const updateSub = async (req, res, next) => {
      const {error} = subscriptionJoiSchema.validate(req.body);
      if(error){
        throw createError(400, "missing field subscription")
      }
      const {_id} = req.user;
      const {subscription} = req.body;
      const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
      if(!result){
        throw createError(404, "Not Found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {result}})
    
  }

  module.exports = updateSub;