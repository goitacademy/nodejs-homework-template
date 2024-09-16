const getCurrent = async( req, res, next) => {
try {
const {email, subscription} = req.user  
console.log(subscription);  
res.json({
    email,
    subscription
})
} catch (error) {
    next(error)
}
}

module.exports = getCurrent