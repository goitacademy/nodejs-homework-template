import User from "../../models/user.js";

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true});
    
    res.status(200).json(result);
};

export default updateSubscription;