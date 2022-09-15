const getCurrent = async (req, res) => {
    const { email, subscription,avatarURL,verify} = req.user;
    res.json({
        status: "OK",
        code: 200,
        data: {
            userData: {
                email,
                subscription,
                avatarURL,
                verify,
            },
        },
    });
}
module.exports = getCurrent;