module.export = (func) => (req, res, next) => {
    func(req, res, next).catch(error) = console.log(error.messenge) 
}