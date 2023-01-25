const ctrlWrapper = (ctrl) => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ctrlWrapper;


// // Comments
// // ctrlWrapper - параметром отримає один із контроллерів і обертає в іншу ф-ю
// // ця maiddleware потрібна, щоб не писати всередині контроллера блок try-catch
// const ctrlWrapper = (ctrl) => {
//     return async (req, res, next) => {
//         try {
//             await ctrl(req, res, next);
//         } catch (error) {
//             next(error)
//         }
//     }
// }

// module.exports = ctrlWrapper;