const bcrypt = require('bcryptjs');
const User = require('../../models/users/users');
const { registrationValiadation } = require('../../valiadators/joiValiadator');

const signup = async (req, res, next) => {
    try {
    //     const { error, value } = registrationValiadation(req.body);
    // if (error) {
    //   const fieldName = error.details[0].path[0];
    //   return res.status(400).json({
    //     message: `missing required ${fieldName} field`
    //   })
    // }
        const { email, password } = req.body;
        const userI = await User.findOne({ email });
        if (userI) {
            return res.status(409).json({
                message: "Email in use"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...req.body, password: hashPassword });
        return res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription }  });   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... Something wrong in DB',});
    }
}

module.exports = {
    signup
}