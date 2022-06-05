class ValidationError extends Error{
constructor(message){
    this.status=400;
    super(message);
}
}

class WrongParametersError extends Error{
    constructor(message){
        this.status=400;
        super(message);
    }
    }
    class UpdateParametersError extends Error{
        constructor(message){
            this.status=400;
            super({message:"missing field favorite"});
        }
        }
module.exports={
    ValidationError,
    WrongParametersError,
    UpdateParametersError
}