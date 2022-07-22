

const getCurrent = async(req, res) => {
    const {email} = req.user;

    res.json({
    "status" : "success",
    "code": 200,
    user : {
        email
    }
    })
}

module.exports = getCurrent;