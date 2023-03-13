const fs = require('fs/promises')

const updateJsonData = (path, data) => {
    fs.writeFile(path, JSON.stringify(data, null, '\t'))
        .catch(err => {
            throw err
        })
}

module.exports = updateJsonData