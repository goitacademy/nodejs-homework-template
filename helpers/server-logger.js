const date = require('moment');
const fs = require('fs/promises');

const serverLogger = async (req, res, next) => {
    const { method, url } = req
    const currentDate = date().format('YYYY-MM-DD_hh:mm:ss');
    await fs.appendFile('server.log', `${method} ${url} ${currentDate}\n`);
    next();
}

module.exports = serverLogger;
