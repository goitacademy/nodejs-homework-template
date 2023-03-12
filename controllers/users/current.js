
const {currentUser} = require('../../models/users')

const current = async (req,res) => {
    const {id } = req.body;
    const user = await currentUser (id);
    if (user) {
        return res.status(200).json ({
        status: 'success',
        code:200,
        message: {
            email: user.email,
            subscription: user.subscription
        }
    })
    } else {
        return res.status(401).json ({
            status: 'error',
            code:401,
            message: "Unauthorized"
        })
    }
    
      };

      module.exports = {current}