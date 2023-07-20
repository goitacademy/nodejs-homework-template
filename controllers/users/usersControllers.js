const User = require('../../models/users/users');
const { subscpiptionUserUpdateValiadation } = require('../../valiadators/joiValiadator');

const getCurrent = async (req, res) => {
    try {
        const { email } = req.user;
        const userI = await User.findOne({ email });
        if (!userI) {
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

const changeUserData = async (req, res) => {
    const { name, email, birthday, phone, city } = req.body;
    try {
    // const { error, fieldName } = subscpiptionUserUpdateValiadation(subscription);
    // if (error) {
    //   return res.status(400).json({
    //     message: `missing required ${fieldName} field`
    //   })
    // }
// !!! поля не должны быть пустыми, если пустые передать старые значения.
        const { id } = req.user;
        const renewUser = await User.findByIdAndUpdate(id, { name, email, birthday, phone, city });
        return res.status(201).json(renewUser);
    } catch (err) {
        console.log(err)
        res.sendStatus(500).json({ message: 'Ooops... Something wrong in DB' });
    }
}

module.exports = {
    getCurrent,
    changeUserData
}