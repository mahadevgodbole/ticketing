const {CustomError} = require('./custom-error');


class DatabaseConnectionError extends CustomError{

    reason = "Error connecting to database";
    statusCode=500;

    constructor(){
        super("Error connecting to database");
    }

    serializeErrors(){
        return [
            {
                message:this.reason
            }
        ]
    }
}
module.exports = { DatabaseConnectionError };