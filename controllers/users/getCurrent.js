

const getCurrent = async (req,res) => {
    const {email}=req.user
    res.json({
        code: 200,
         "email":
            email
        
    })
}

module.exports = getCurrent
