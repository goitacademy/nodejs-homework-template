
const currentUser = async (req,res) => {
    try {
        const {email, subscription} = req.user;
        return res.status(200).json({user:{email,subscription}});

    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports = currentUser;