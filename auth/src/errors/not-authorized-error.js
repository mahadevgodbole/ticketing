const {CustomError}=require("./custom-error")

class NotAuthorizedError extends CustomError{
    statusCode=401;

    constructor(){
        super("Not Authorized");
    }

    serializeErrors() {
        return [{message:"Not Authorized"}]
    }
}

module.exports = { NotAuthorizedError };
