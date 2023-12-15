module.exports = fn => (res, req, next) => {
    fn(res, req, next).catch(next)
}