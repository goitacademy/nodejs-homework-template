const fs = require('fs/promises')

const createDirIfNotExists = async (path) => {
try{
    await fs.access(path)
}catch(e){
    if(e.code === 'ENOENT') {
    await fs.mkdir(path)
    }
}
}
module.exports = createDirIfNotExists