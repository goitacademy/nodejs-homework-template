const User = require('../../models/users/users');
const { subscpiptionUserUpdateValiadation } = require('../../valiadators/joiValiadator');

const getCurrent = async (req, res) => {
    try {
        const { email, subscription } = req.user;
        const userI = await User.findOne({ email });
        if (!userI || !subscription) {
            return res.status(401).json({
                message: "Email or password is wrong"
            });
        }
        User.findByIdAndUpdate(userI._id, { subscription });
        return res.status(200).json({ user: { email: email, subscription: subscription } })
    } catch (err) {
        res.sendStatus(500).json({ message: 'Ooops... Something wrong in DB' });
    }
}

const changeUserSubscription = async (req, res) => {
    const { subscription } = req.body;
    try {
    const { error, fieldName } = subscpiptionUserUpdateValiadation(subscription);
    if (error) {
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
        
        const { id } = req.user;
        await User.findByIdAndUpdate(id, { subscription });
        return res.status(201).json({ message: 'Contact is updated' });
    } catch (err) {
        console.log(err)
        res.sendStatus(500).json({ message: 'Ooops... Something wrong in DB' });
    }
}

module.exports = {
    getCurrent,
    changeUserSubscription
}