// ф-ція-декоратор огортає в try-catch
const ctrlWrapper = ctrl => {
    const wrapper = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    }
       return wrapper;
}
module.exports = ctrlWrapper;