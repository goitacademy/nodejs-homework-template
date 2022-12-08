const controllerCheck = (controller) => {
    const check = async (reg, res, next) => {
        try {
            await controller(reg, res, next)
        } catch (error) {
            next(error)
        }
    }
    return check;
}

module.exports = controllerCheck;