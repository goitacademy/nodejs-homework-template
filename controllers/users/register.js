const {User} = require("../../models/users");



const register = async (req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    if (user) {
        return res.status(409).json({
            message: 'Email is used'
        });
    }

   const result =  await User.create({email,password});
    console.log(result)

    res.status(201).json({
        user:{
            email,
            "subscription": "starter"
        }
    })
}

module.exports = register;