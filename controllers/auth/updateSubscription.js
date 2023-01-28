const {Conflict} = require('http-errors');
const {User} = require('../../models');
const subscriptionArr = require('../../helpers/subscriprion');

const updateSubscription = async (req, res)=>{
    const {_id} = req.user;
    const {subscription} = req.body;
    
    const canUpdateSubscription = subscriptionArr.includes(subscription);
    
    if(!canUpdateSubscription){
        throw new Conflict(`Error type of subscription`);
    }

const result = await User.findByIdAndUpdate(_id, req.body, {new:true});

res.json({
    status: "success",
    code: 200,
    data: {
        result,
    }
});
}

module.exports = updateSubscription;