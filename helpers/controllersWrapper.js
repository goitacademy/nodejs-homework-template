const controllersWrapper = controller => {
   const func = async (req, res, next) => {
      try {
         await controller(req, res, next)
      }
      catch (e) {
         next(e)
      }
   }
   return func
}

module.exports = controllersWrapper;