const { isValidObjectId } = require("mongoose");
module.exports = (id) => {
    if (isValidObjectId(id)) {
        return true
    }
    return false
}

