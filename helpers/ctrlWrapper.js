const ctrlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error); // відправляємо на функцію обрабника помилок (вона має завжди 4 аргумента)
        }
    }

    return func;
}

module.exports = ctrlWrapper;