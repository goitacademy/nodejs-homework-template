const getCurrent = async (req, res) => {
    const {email, subscription} = res.user
    res.json({email, subscription })
}

module.exports = getCurrent