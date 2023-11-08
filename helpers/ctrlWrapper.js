const ctrlWpapper = ctrl => {
    const fnc = async (reg, res, next) =>{
        try {
          await ctrl(reg, res, next)
        }
        catch(error) {
          next(error)
        }
    }
    return fnc
}
module.exports = ctrlWpapper