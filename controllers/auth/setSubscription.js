const {User,schemas} = require("../../models/user")
const {createErr} = require("../../helpers")

const setSubscription = async(req,res)=>{
    const {error} = schemas.subscription.validate(req.body)
    if (error) {
     throw createErr(400,error.message)
    }
  const {_id} = req.user
  console.log(_id);
  const result = await User.findByIdAndUpdate(_id,req.body,{new: true})
  if (!result) {
    console.log(11);
    throw createErr(404)
  }
  res.json(result)
}
module.exports = setSubscription