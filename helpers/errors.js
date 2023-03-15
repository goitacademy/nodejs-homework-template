class BadRequestError extends Error{
constructor(message){
     super(message);
    this.status=400 ;

}
}
class ValidationJoiError extends Error{
    constructor(message){
        super(message);
       this.status=400;
   
   }
}
class NotFoundError extends Error{
    constructor(message){
      super(message); 
      this.status=404; 
    }
}
class UnauthorizedError extends Error{
    constructor(message){
        super(message); 
        this.status=401; 
      }
}
class ConflictErrors extends Error{
    constructor(message){
        super(message); 
        this.status=409; 
      }
}
class NotAutorisate extends Error{
    constructor(message){
        super(message); 
        this.status=401; 
      }
}
module.exports= {
    BadRequestError,
    ValidationJoiError,
    NotFoundError,
    UnauthorizedError,
    ConflictErrors,
    NotAutorisate,

}