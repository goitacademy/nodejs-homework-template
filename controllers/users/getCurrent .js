const getCurrent = async (req, res) => {
    console.log("Its controller")
    const { email, subscription } = req.user;
    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            email,
            subscription,
        }
    })
}

module.exports = getCurrent;