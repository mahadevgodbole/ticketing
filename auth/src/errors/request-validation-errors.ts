import { ValidationError } from "express-validator";

export class RequestValidationError extends Error{

    statusCode=400;

    constructor(public errors: ValidationError[]){
        super();

        //Only beacuse we are extending a built in class
        
        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }

    serializeErros(){
        return this.errors.map(err=>{
           return {message: err.msg,field:err.type};
        })
    }
}

// // throw new RequestValidationError(errors);
// if (error.type === 'alternative') {
//     console.log(`There are ${error.nestedErrors.length} errors under this alternative list`);
//   } else if (error.type === 'field') {
//     console.log(`There's an error with field ${error.path) in the request ${error.location}`);
//   }