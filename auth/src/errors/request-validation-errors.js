
const {CustomError} = require('./custom-error');


// implements CustomError
// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {
//         message: string;
//         field?: string
//     }[]
// }




 class RequestValidationError extends CustomError  {

    statusCode = 400;

    constructor(errors) {
        super("Invalid request parameters");
        this.errors=errors
        //Only beacuse we are extending a built in class
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.type };
        })
    }
}
module.exports = { RequestValidationError };

// // throw new RequestValidationError(errors);
// if (error.type === 'alternative') {
//     console.log(`There are ${error.nestedErrors.length} errors under this alternative list`);
//   } else if (error.type === 'field') {
//     console.log(`There's an error with field ${error.path) in the request ${error.location}`);
//   }