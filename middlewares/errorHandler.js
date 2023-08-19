module.exports = (error, req, res, next) => {
    const code = res.statusCode || 500;
    res.status(code).json({
        code,
        stack: error.stack,
    });
};