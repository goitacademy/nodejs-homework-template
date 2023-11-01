

const ctrlWrapper = getAll =>{
  const funk = async (req, res, next) => {
    try {
      await getAll(res, req,next);
    } catch (error) {
      next(error)
    }
  }
  return funk
}

module.exports = ctrlWrapper;